const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type OrderInput = {
  product_category: string;
  sub_category: string;
  brand: string;
  product_price: number;
  discount_percent: number;
  product_rating: number;
  review_count: number;
  fragile_item: number;
  warranty_available: number;
  product_return_rate: number;
  category_return_rate: number;
  brand_return_rate: number;
  defect_rate: number;
  seller_rating: number;
  seller_return_rate: number;
  fulfillment_type: string;
  payment_method: string;
  quantity: number;
  shipping_distance_km: number;
  delayed_delivery: number;
  wishlist_before_purchase: number;
  product_page_views: number;
  customer_support_calls: number;
  chat_interactions: number;
};

export type PredictionResponse = {
  return_probability: number;
  predicted_returned: boolean;
  risk_level: string;
};

export type MetricItem = {
  name: string;
  value: number;
};

export type FeatureImportanceItem = {
  feature: string;
  importance: number;
};

export type ModelInfoResponse = {
  model_name: string;
  metrics: MetricItem[];
  feature_importance: FeatureImportanceItem[];
  threshold: number;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error (${response.status}): ${error}`);
  }

  return response.json() as Promise<T>;
}

export function fetchModelInfo(): Promise<ModelInfoResponse> {
  return request<ModelInfoResponse>("/model-info");
}

export function predictReturn(
  order: OrderInput,
): Promise<PredictionResponse> {
  return request<PredictionResponse>("/predict", {
    method: "POST",
    body: JSON.stringify(order),
  });
}
