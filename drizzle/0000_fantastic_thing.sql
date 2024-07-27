DO $$ BEGIN
 CREATE TYPE "public"."cart_status" AS ENUM('ACTIVE', 'CHECKED_OUT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."product_image_type" AS ENUM('DETAIL', 'CATEGORY', 'GALLERY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'CUSTOMER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_account" (
	"user_id" varchar NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_cart" (
	"id" varchar PRIMARY KEY NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"status" "cart_status" DEFAULT 'ACTIVE' NOT NULL,
	"customer_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_cart_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_customer_address" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"street" text NOT NULL,
	"city" text NOT NULL,
	"state" text,
	"postal_code" text NOT NULL,
	"country" text NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"customer_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_customer" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone_number" varchar(100),
	"user_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_customer_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_email_verification_token" (
	"email" varchar(254) NOT NULL,
	"token" varchar NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "ap_email_verification_token_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "ap_email_verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_order_item" (
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"order_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ap_order_item_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_order" (
	"id" varchar PRIMARY KEY NOT NULL,
	"sub_total" integer NOT NULL,
	"tax" integer NOT NULL,
	"shipping_fee" integer NOT NULL,
	"total" integer NOT NULL,
	"payment_method" varchar(50),
	"notes" text,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL,
	"approved_at" timestamp with time zone,
	"shipped_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"canceled_at" timestamp with time zone,
	"customer_id" varchar NOT NULL,
	"shipping_address_id" varchar NOT NULL,
	"billing_address_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_password_reset_token" (
	"email" varchar(254) NOT NULL,
	"token" varchar NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "ap_password_reset_token_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "ap_password_reset_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_product_category" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_product_category_name_unique" UNIQUE("name"),
	CONSTRAINT "ap_product_category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_product_image" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "product_image_type" NOT NULL,
	"alt" varchar(100) NOT NULL,
	"mobile_url" text NOT NULL,
	"tablet_url" text NOT NULL,
	"desktop_url" text NOT NULL,
	"product_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_product_item" (
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"product_id" varchar NOT NULL,
	"cart_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_product_item_product_id_cart_id_pk" PRIMARY KEY("product_id","cart_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"description" text NOT NULL,
	"features" text NOT NULL,
	"category_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_product_name_unique" UNIQUE("name"),
	CONSTRAINT "ap_product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_related_product" (
	"product_id" varchar NOT NULL,
	"related_product_id" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "ap_related_product_product_id_related_product_id_pk" PRIMARY KEY("product_id","related_product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ap_user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar(254) NOT NULL,
	"email_verified" timestamp,
	"password" text,
	"role" "user_role" DEFAULT 'CUSTOMER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_account" ADD CONSTRAINT "ap_account_user_id_ap_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ap_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_cart" ADD CONSTRAINT "ap_cart_customer_id_ap_customer_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."ap_customer"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_customer_address" ADD CONSTRAINT "ap_customer_address_customer_id_ap_customer_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."ap_customer"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_customer" ADD CONSTRAINT "ap_customer_user_id_ap_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ap_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_order_item" ADD CONSTRAINT "ap_order_item_order_id_ap_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."ap_order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_order_item" ADD CONSTRAINT "ap_order_item_product_id_ap_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ap_product"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_order" ADD CONSTRAINT "ap_order_customer_id_ap_customer_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."ap_customer"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_order" ADD CONSTRAINT "ap_order_shipping_address_id_ap_customer_address_id_fk" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."ap_customer_address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_order" ADD CONSTRAINT "ap_order_billing_address_id_ap_customer_address_id_fk" FOREIGN KEY ("billing_address_id") REFERENCES "public"."ap_customer_address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_product_image" ADD CONSTRAINT "ap_product_image_product_id_ap_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ap_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_product_item" ADD CONSTRAINT "ap_product_item_product_id_ap_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ap_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_product_item" ADD CONSTRAINT "ap_product_item_cart_id_ap_cart_customer_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."ap_cart"("customer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_product" ADD CONSTRAINT "ap_product_category_id_ap_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."ap_product_category"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ap_related_product" ADD CONSTRAINT "ap_related_product_product_id_ap_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."ap_product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_address_idx" ON "ap_customer_address" ("customer_id","street","city","postal_code","country");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_status_idx" ON "ap_order" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "ap_order" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_images_type_idx" ON "ap_product_image" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_is_new_idx" ON "ap_product" ("is_new");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "ap_user" ("email");