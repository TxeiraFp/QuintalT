import type { Decimal } from "../../generated/prisma/internal/prismaNamespace.js";

export interface ProductProps {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  price: Decimal;
  imageUrl?: string;
  buyUrl?: string;
  featured?: boolean;
  active?: boolean;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  private readonly id?: number;
  private name: string;
  private slug: string;
  private description?: string;
  private price: Decimal;
  private imageUrl?: string;
  private buyUrl?: string;
  private featured: boolean;
  private active: boolean;
  private categoryId: number;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.description = props.description;
    this.price = props.price;
    this.imageUrl = props.imageUrl;
    this.buyUrl = props.buyUrl;
    this.featured = props.featured ?? false;
    this.active = props.active ?? true;
    this.categoryId = props.categoryId;

    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSlug(): string {
    return this.slug;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getPrice(): Decimal {
    return this.price;
  }

  getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  getBuyUrl(): string | undefined {
    return this.buyUrl;
  }

  getFeatured(): boolean {
    return this.featured;
  }

  getActive(): boolean {
    return this.active;
  }

  getCategoryId(): number {
    return this.categoryId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setFeatured(featured: boolean): void {
    this.featured = featured;
    this.updatedAt = new Date();
  }

  setActive(active: boolean): void {
    this.active = active;
    this.updatedAt = new Date();
  }

  update(
    name: string,
    slug: string,
    description: string | undefined,
    price: Decimal,
    imageUrl: string | undefined,
    buyUrl: string | undefined,
    categoryId: number
  ): void {
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.buyUrl = buyUrl;
    this.categoryId = categoryId;
    this.updatedAt = new Date();
  }
}
