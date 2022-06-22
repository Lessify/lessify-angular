export interface Schema {
  // Path where to create the file with environment variables.
  path: string;

  // Prefix to filtered only required environment variables.
  prefix?: string;
}
