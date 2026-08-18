"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice, cn } from "@/lib/format";
import Reveal from "@/components/reveal";

const DELIVERY_FEE = 100;

interface FormFields {
  name: string;
  phone: string;
  address: string;
  district: string;
  notes: string;
}

const emptyFields: FormFields = {
  name: "",
  phone: "",
  address: "",
  district: "",
  notes: "",
};

type Errors = Partial<Record<keyof FormFields, string>>;

const BD_PHONE = /^01[3-9]\d{8}$/;

export default function LandingOrderForm() {
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<{ fields: FormFields; product: string; total: number } | null>(
    null
  );

  const selectedProduct = products.find((p) => p.id === productId) ?? products[0];
  const subtotal = useMemo(() => selectedProduct.price * quantity, [selectedProduct, quantity]);
  const total = subtotal + DELIVERY_FEE;

  const setField = (key: keyof FormFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "নাম দিন";
    if (!fields.phone.trim()) next.phone = "মোবাইল নম্বর দিন";
    else if (!BD_PHONE.test(fields.phone.trim()))
      next.phone = "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)";
    if (!fields.address.trim()) next.address = "ঠিকানা দিন";
    if (!fields.district.trim()) next.district = "জেলা / এলাকা দিন";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setOrder({ fields, product: selectedProduct.name, total });
    }, 900);
  };

  const handleReset = () => {
    setOrder(null);
    setFields(emptyFields);
    setErrors({});
    setQuantity(1);
  };

  return (
    <section id="order" className="scroll-mt-24 bg-[#fbf3e2] py-16 sm:py-20">
      <div className="container-premium">
        <Reveal className="mx-auto mb-10 max-w-3xl">
          <div className="rounded-2xl bg-[#0f3b38] px-6 py-4 text-center shadow-lg shadow-black/10">
            <h2 className="text-balance text-base font-bold text-white sm:text-lg">
              নিচের ফর্মটি পূরণ করে অর্ডার করুন
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-10">
            {order ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 size={52} className="text-[#0f3b38]" strokeWidth={1.25} />
                <h3 className="mt-5 font-serif text-2xl text-ink">
                  আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
                  {order.fields.name}, আপনার {order.product} অর্ডারটি{" "}
                  {order.fields.phone} নম্বরে শীঘ্রই যোগাযোগ করে নিশ্চিত করা হবে। মোট
                  পরিমাণ: <span className="font-semibold text-ink">{formatPrice(order.total)}</span>
                </p>
                <button
                  onClick={handleReset}
                  className="btn-focus mt-7 rounded-full bg-[#111813] px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  নতুন অর্ডার দিন
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div>
                  <h3 className="mb-5 text-sm font-semibold text-ink/70 sm:text-base">
                    কোন প্যাকেজটি নিতে চান সিলেক্ট করুন
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {products.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setProductId(p.id)}
                        className={cn(
                          "btn-focus flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors duration-300",
                          productId === p.id
                            ? "border-[#0f3b38] bg-[#0f3b38]/5"
                            : "border-ink/10 hover:border-ink/25"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                            productId === p.id ? "border-[#0f3b38]" : "border-ink/25"
                          )}
                        >
                          {productId === p.id && (
                            <span className="h-2 w-2 rounded-full bg-[#0f3b38]" />
                          )}
                        </span>
                        <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-[#fbf3e2]">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-ink">
                            {p.name}
                          </span>
                          <span className="block text-xs text-ink/50">
                            {p.volume} · {formatPrice(p.price)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <span className="text-sm font-medium text-ink/70">পরিমাণ</span>
                    <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="btn-focus flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-medium text-ink">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="btn-focus flex h-7 w-7 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-ink/70 sm:text-base">
                      গ্রাহকের তথ্য
                    </h3>
                    <Field
                      label="নাম"
                      value={fields.name}
                      onChange={(v) => setField("name", v)}
                      error={errors.name}
                      placeholder="আপনার পুরো নাম"
                    />
                    <Field
                      label="মোবাইল নম্বর"
                      value={fields.phone}
                      onChange={(v) => setField("phone", v)}
                      error={errors.phone}
                      placeholder="017XXXXXXXX"
                      type="tel"
                    />
                    <Field
                      label="ঠিকানা"
                      value={fields.address}
                      onChange={(v) => setField("address", v)}
                      error={errors.address}
                      placeholder="বাসা/রোড/এলাকার নাম"
                      textarea
                    />
                    <Field
                      label="জেলা / এলাকা"
                      value={fields.district}
                      onChange={(v) => setField("district", v)}
                      error={errors.district}
                      placeholder="যেমন: ঢাকা"
                    />
                    <Field
                      label="প্রয়োজনীয় অতিরিক্ত তথ্য"
                      value={fields.notes}
                      onChange={(v) => setField("notes", v)}
                      placeholder="ঐচ্ছিক"
                      textarea
                    />
                  </div>

                  <aside className="h-fit rounded-2xl bg-[#fbf3e2] p-6">
                    <h3 className="mb-5 text-sm font-semibold text-ink/70">অর্ডার সামারি</h3>
                    <div className="flex items-center gap-3">
                      <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={selectedProduct.images[0]}
                          alt={selectedProduct.name}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0f3b38] text-[10px] text-white">
                          {quantity}
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-ink">{selectedProduct.name}</p>
                        <p className="text-xs text-ink/45">{selectedProduct.volume}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 border-t border-ink/10 pt-4 text-sm">
                      <div className="flex justify-between text-ink/60">
                        <span>সাবটোটাল</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-ink/60">
                        <span>ডেলিভারি চার্জ</span>
                        <span>{formatPrice(DELIVERY_FEE)}</span>
                      </div>
                      <div className="mt-2 flex justify-between border-t border-ink/10 pt-3 text-base font-bold text-ink">
                        <span>সর্বমোট</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-focus mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#111813] py-4 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          প্রসেস হচ্ছে...
                        </>
                      ) : (
                        <>অর্ডার করুন — {formatPrice(total)}</>
                      )}
                    </button>
                  </aside>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium text-ink/60">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={cn(
            "btn-focus resize-none rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30",
            error ? "border-red-400" : "border-ink/15 focus:border-[#0f3b38]"
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "btn-focus rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30",
            error ? "border-red-400" : "border-ink/15 focus:border-[#0f3b38]"
          )}
        />
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
