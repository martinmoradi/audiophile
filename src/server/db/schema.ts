import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  uniqueIndex,
  primaryKey,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `audiophile_${name}`);

export const userRole = pgEnum("user_role", ["ADMIN", "CUSTOMER"]);

export const users = createTable(
  "user",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    email: varchar("email", { length: 254 }).notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    password: text("password"),
    role: userRole("role").notNull().default("CUSTOMER"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (user) => ({
    emailIndex: uniqueIndex("email_idx").on(user.email),
  }),
);

export const customers = createTable("customer", {
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 100 }),

  userId: varchar("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const customerAddresses = createTable(
  "customer_address",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    name: varchar("name", { length: 100 }),
    street: text("street").notNull(),
    city: text("city").notNull(),
    state: text("state"),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    isDefault: boolean("is_default").notNull().default(false),

    customerId: varchar("customer_id")
      .references(() => customers.userId, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (customerAddress) => ({
    customerIdIndex: index("customer_id_idx").on(customerAddress.customerId),
    uniqueAddress: uniqueIndex("unique_address_idx").on(
      customerAddress.customerId,
      customerAddress.street,
      customerAddress.city,
      customerAddress.postalCode,
      customerAddress.country,
    ),
  }),
);

export const productCategories = createTable("product_category", {
  id: varchar("id").$defaultFn(createId).primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const products = createTable(
  "product",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    priceInCents: integer("price").notNull(),
    isNew: boolean("is_new").notNull().default(false),
    description: text("description").notNull(),
    features: text("features").notNull(),

    categoryId: varchar("category_id")
      .references(() => productCategories.id, { onDelete: "restrict" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => ({
    categoryIndex: index("category_id_idx").on(product.categoryId),
    newProductIndex: index("is_new_idx").on(product.isNew),
  }),
);

export const productImageType = pgEnum("product_image_type", [
  "DETAIL",
  "CATEGORY",
  "GALLERY",
]);

export const productImages = createTable(
  "product_image",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    type: productImageType("type").notNull(),
    alt: varchar("alt", { length: 100 }).notNull(),
    mobileUrl: text("mobile_url").notNull(),
    tabletUrl: text("tablet_url").notNull(),
    desktopUrl: text("desktop_url").notNull(),

    productId: varchar("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (productImage) => ({
    productIdIndex: index("product_id_idx").on(productImage.productId),
    productTypeIndex: index("product_type_idx").on(productImage.type),
  }),
);

export const relatedProducts = createTable(
  "related_product",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    productId: varchar("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    relatedProductId: varchar("related_product_id"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (relationship) => ({
    productIdIndex: index("product_id_idx").on(relationship.productId),
    relatedProductIdIndex: index("related_product_id_idx").on(
      relationship.relatedProductId,
    ),
    uniqueRelationship: uniqueIndex("unique_related_product_idx").on(
      relationship.productId,
      relationship.relatedProductId,
    ),
  }),
);

export const cartStatus = pgEnum("cart_status", ["ACTIVE", "CHECKED_OUT"]);

export const cart = createTable("cart", {
  totalInCents: integer("total").notNull().default(0),
  status: cartStatus("status").notNull().default("ACTIVE"),

  customerId: varchar("customer_id")
    .references(() => customers.userId, { onDelete: "cascade" })
    .notNull()
    .primaryKey(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const productItem = createTable(
  "product_item",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    priceInCents: integer("price").notNull(),
    quantity: integer("quantity").notNull(),

    productId: varchar("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    cartId: varchar("cart_id")
      .references(() => cart.customerId, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (productItem) => ({
    productIdIndex: index("product_id_idx").on(productItem.productId),
    cartIdIndex: index("cart_id_idx").on(productItem.cartId),
    uniqueProductInCart: uniqueIndex("unique_product_in_cart_idx").on(
      productItem.productId,
      productItem.cartId,
    ),
    quantityCheck: sql`CONSTRAINT positive_quantity CHECK (quantity > 0)`,
    priceCheck: sql`CONSTRAINT positive_price CHECK (price > 0)`,
  }),
);

export const orderStatus = pgEnum("order_status", [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
]);

export const orders = createTable(
  "order",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    subtotalInCents: integer("total").notNull(),
    taxInCents: integer("tax").notNull(),
    shippingFeeInCents: integer("shipping_fee").notNull(),
    totalInCents: integer("grand_total").notNull(),
    paymentMethod: varchar("payment_method", { length: 50 }),
    notes: text("notes"),

    status: orderStatus("status").notNull().default("PENDING"),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    shippedAt: timestamp("shipped_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),

    customerId: varchar("customer_id")
      .references(() => customers.userId, { onDelete: "cascade" })
      .notNull(),
    shippingAddressId: varchar("shipping_address_id").references(
      () => customerAddresses.id,
    ),
    billingAddressId: varchar("billing_address_id").references(
      () => customerAddresses.id,
    ),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (order) => ({
    customerIdIndex: index("customer_id_idx").on(order.customerId),
    shippingAddressIndex: index("shipping_address_idx").on(
      order.shippingAddressId,
    ),
    billingAddressIndex: index("billing_address_idx").on(
      order.billingAddressId,
    ),
    totalCheck: sql`CONSTRAINT check_total CHECK (total_in_cents = subtotal_in_cents + tax_in_cents + shipping_fee_in_cents)`,
    nonNegativeChecks: sql`
      CONSTRAINT non_negative_subtotal CHECK (subtotal_in_cents >= 0),
      CONSTRAINT non_negative_tax CHECK (tax_in_cents >= 0),
      CONSTRAINT non_negative_shipping_fee CHECK (shipping_fee_in_cents >= 0),
      CONSTRAINT non_negative_total CHECK (total_in_cents >= 0)
    `,
    statusTimestampCheck: sql`
      CONSTRAINT status_timestamp_order CHECK (
        (approved_at IS NULL OR approved_at >= created_at) AND
        (shipped_at IS NULL OR (approved_at IS NOT NULL AND shipped_at >= approved_at)) AND
        (delivered_at IS NULL OR (shipped_at IS NOT NULL AND delivered_at >= shipped_at)) AND
        (canceled_at IS NULL OR canceled_at >= created_at)
      )
    `,
  }),
);

export const orderItems = createTable(
  "order_item",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    quantity: integer("quantity").notNull(),
    priceInCents: integer("price").notNull(),

    orderId: varchar("order_id")
      .references(() => orders.id, { onDelete: "cascade" })
      .notNull(),
    productId: varchar("product_id")
      .references(() => products.id, { onDelete: "restrict" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (orderItem) => ({
    orderIdIndex: index("order_id_idx").on(orderItem.orderId),
    productIdIndex: index("product_id_idx").on(orderItem.productId),
    quantityCheck: sql`CONSTRAINT positive_quantity CHECK (quantity > 0)`,
    priceCheck: sql`CONSTRAINT positive_price CHECK (price > 0)`,
  }),
);

/* -------- AUTHENTIFICATION ---------- */

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),

    // OAuth convention: snake_case for OAuth-related fields
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (account) => ({
    pk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    userIdIndex: index("user_id_idx").on(account.userId),
  }),
);

export const emailVerificationTokens = createTable(
  "email_verification_token",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    email: varchar("email", { length: 254 }).notNull(),
    token: varchar("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (emailVerificationToken) => ({
    pk: primaryKey({
      columns: [emailVerificationToken.email, emailVerificationToken.token],
    }),
  }),
);

export const passwordResetTokens = createTable(
  "password_reset_token",
  {
    id: varchar("id").$defaultFn(createId).primaryKey(),
    email: varchar("email", { length: 254 }).notNull(),
    token: varchar("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (passwordResetToken) => ({
    pk: primaryKey({
      columns: [passwordResetToken.email, passwordResetToken.token],
    }),
  }),
);
