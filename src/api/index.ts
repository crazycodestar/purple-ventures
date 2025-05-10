import { z } from "zod";
import { API_ENDPOINTS } from "./endpoints";
import {
  getFiltersResponseSchema,
  getCollectionBySlugAndStoreSlugResponseSchema,
  getProductsByCollectionSlugAndStoreSlugResponseSchema,
  getProductsByCategoryIdAndStoreSlugResponseSchema,
  getCategoriesByStoreSlugResponseSchema,
  getSubCategoriesByParentIdAndStoreSlugResponseSchema,
  getCategoryByIdAndStoreSlugResponseSchema,
  getProductByIdResponseSchema,
  getOrderByReferenceOrSlugResponseSchema,
  initializeOrderResponseSchema,
  getStatesResponseSchema,
  getCitiesResponseSchema,
  getRatesResponseSchema,
  getContentsByStoreSlugResponseSchema,
  getImageUrlResponseSchema,
  getProductsByIdsResponseSchema,
  generateUploadUrlResponseSchema,
} from "./returnTypes";

export async function fetchAPI<T>(
  endpoint: string,
  options?: {
    method?: "GET" | "POST";
    params?: Record<string, string>;
    body?: any;
  }
): Promise<T> {
  const { method = "GET", params, body } = options || {};

  const baseUrl = import.meta.env.VITE_CONVEX_URL!;
  let url = baseUrl + endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    url += `?${searchParams.toString()}`;
  }

  // console.log("url -> ", url);
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Collection API functions
export const collectionsAPI = {
  getFilters: (storeSlug: string) =>
    fetchAPI(API_ENDPOINTS.collections.getFilters, {
      params: { storeSlug },
    }).then((data) => getFiltersResponseSchema.parse(data)),

  getCollectionBySlugAndStoreSlug: (storeSlug: string, slug: string) =>
    fetchAPI(API_ENDPOINTS.collections.getCollectionBySlugAndStoreSlug, {
      params: { storeSlug, slug },
    }).then((data) =>
      getCollectionBySlugAndStoreSlugResponseSchema.parse(data)
    ),

  getProductsByCollectionSlugAndStoreSlug: (
    storeSlug: string,
    collectionSlug: string,
    properties?: any
  ) =>
    fetchAPI(
      API_ENDPOINTS.collections.getProductsByCollectionSlugAndStoreSlug,
      {
        params: { storeSlug, collectionSlug },
        body: properties,
      }
    ).then((data) =>
      getProductsByCollectionSlugAndStoreSlugResponseSchema.parse(data)
    ),

  getCategoryByIdAndStoreSlug: (storeSlug: string, categoryId: string) =>
    fetchAPI(API_ENDPOINTS.collections.getCategoryByIdAndStoreSlug, {
      params: { storeSlug, categoryId },
    }).then((data) => getCategoryByIdAndStoreSlugResponseSchema.parse(data)),

  getProductsByCategoryIdAndStoreSlug: (
    storeSlug: string,
    categoryId: string,
    properties?: { key: string; value: string[] }[]
  ) =>
    fetchAPI(API_ENDPOINTS.collections.getProductsByCategoryIdAndStoreSlug, {
      params: { storeSlug, categoryId, properties: JSON.stringify(properties) },
    }).then((data) =>
      getProductsByCategoryIdAndStoreSlugResponseSchema.parse(data)
    ),

  getSubCategoriesByParentIdAndStoreSlug: (
    storeSlug: string,
    parentId: string
  ) =>
    fetchAPI(API_ENDPOINTS.collections.getSubCategoriesByParentIdAndStoreSlug, {
      params: { storeSlug, parentId },
    }).then((data) =>
      getSubCategoriesByParentIdAndStoreSlugResponseSchema.parse(data)
    ),

  getCategoriesByStoreSlug: (storeSlug: string) =>
    fetchAPI(API_ENDPOINTS.collections.getCategoriesByStoreSlug, {
      params: { storeSlug },
    }).then((data) => getCategoriesByStoreSlugResponseSchema.parse(data)),
};

// Product API functions
export const productsAPI = {
  getProductById: (id: string) =>
    fetchAPI(API_ENDPOINTS.products.getProductById, {
      params: { id },
    }).then((data) => getProductByIdResponseSchema.parse(data)),

  getProductsByIds: (ids: string[]) =>
    fetchAPI(API_ENDPOINTS.products.getProductsByIds, {
      params: { ids: ids.join(",") },
    }).then((data) => getProductsByIdsResponseSchema.parse(data)),
};

const shippingFormSchema = z.object({
  callbackUrl: z.string().min(1, "Callback URL is required"),
  storeSlug: z.string().min(1, "Store slug is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP code is required"),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().min(1, "Quantity is required"),
      metadatas: z
        .array(
          z.object({
            name: z.string().min(1, "Metadata name is required"),
            value: z.union([z.string(), z.number()]),
          })
        )
        .optional(),
      variants: z
        .array(
          z.object({
            name: z.string().min(1, "Variant name is required"),
            value: z.string().min(1, "Variant value is required"),
          })
        )
        .optional(),
    })
  ),
  shipping: z.number().min(1, "Shipping is required"),
  rateId: z.string().min(1, "Rate ID is required"),
  terminalAddressId: z.string().optional(),
  terminalParcelId: z.string().optional(),
});

// Order API functions
export const ordersAPI = {
  getOrderByReferenceOrSlug: (reference?: string, slug?: string) =>
    fetchAPI(API_ENDPOINTS.orders.getOrderByReferenceOrSlug, {
      params: reference ? { reference } : slug ? { slug } : undefined,
    }).then((data) => getOrderByReferenceOrSlugResponseSchema.parse(data)),

  initialize: (data: z.infer<typeof shippingFormSchema>) =>
    fetchAPI(API_ENDPOINTS.orders.initialize, {
      method: "POST",
      body: data,
    }).then((data) => initializeOrderResponseSchema.parse(data)),
};

// Terminal API functions
export const terminalAPI = {
  getStates: () =>
    fetchAPI(API_ENDPOINTS.terminal.getStates).then((data) =>
      getStatesResponseSchema.parse(data)
    ),

  getCities: (stateCode: string) =>
    fetchAPI(API_ENDPOINTS.terminal.getCities, {
      params: { stateCode },
    }).then((data) => getCitiesResponseSchema.parse(data)),

  getRates: (
    storeSlug: string,
    deliveryAddress: {
      city: string;
      country: string;
      state: string;
      email: string;
      line1: string;
      line2?: string;
      firstName: string;
      lastName: string;
      phone: string;
      zip: string;
    },
    items: Array<{
      productId: string;
      name: string;
      description: string;
      value: number;
      weight: number;
      quantity: number;
    }>
  ) =>
    fetchAPI(API_ENDPOINTS.terminal.getRates, {
      method: "POST",
      body: { storeSlug, deliveryAddress, items },
    }).then((data) => getRatesResponseSchema.parse(data)),
};

// Contents API functions
export const contentsAPI = {
  getContentsByStoreSlug: (storeSlug: string) =>
    fetchAPI(API_ENDPOINTS.contents.getContentsByStoreSlug, {
      params: { storeSlug },
    }).then((data) => getContentsByStoreSlugResponseSchema.parse(data)),

  getImageUrl: (imageId: string) =>
    fetchAPI(API_ENDPOINTS.contents.getImageUrl, {
      params: { imageId },
    }).then((data) => getImageUrlResponseSchema.parse(data)),

  generateUploadUrl: () =>
    fetchAPI(API_ENDPOINTS.contents.generateUploadUrl, {
      method: "POST",
    }).then((data) => generateUploadUrlResponseSchema.parse(data)),
};
