export interface SecretKeyDef {
  key: string;
  label: string;
  section: string;
  placeholder: string;
}

export const SECRET_KEYS: SecretKeyDef[] = [
  {
    key: "meta_conversion_api_token",
    label: "Meta Conversion API Access Token",
    section: "Meta Conversions API",
    placeholder: "EAAV...",
  },
  {
    key: "bizmation_api_token",
    label: "BizMation API Access Token",
    section: "BizMation",
    placeholder: "Bearer token",
  },
  {
    key: "bizmation_inventory_id",
    label: "BizMation Inventory ID",
    section: "BizMation",
    placeholder: "12345",
  },
  {
    key: "missing_orders_api_key_1",
    label: "Missing Orders API Key 1",
    section: "BizMation",
    placeholder: "BizMation-কে এই key দিন",
  },
  {
    key: "missing_orders_api_key_2",
    label: "Missing Orders API Key 2",
    section: "BizMation",
    placeholder: "BizMation-কে এই key দিন",
  },
];
