export class CreateUserDto {
  clerkId: string;

  email: string;

  name: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
