export interface CategoryProps {
  id?: number;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  private readonly id?: number;
  private name: string;
  private slug: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
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

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  update(data: {
    name?: string;
    slug?: string;
  }): void {
    if (data.name !== undefined) {
      this.name = data.name;
    }

    if (data.slug !== undefined) {
      this.slug = data.slug;
    }

    this.updatedAt = new Date();
  }
}
