export abstract class IConfigurationRepository {
  findByName: (name: string) => Promise<string | null>
}
