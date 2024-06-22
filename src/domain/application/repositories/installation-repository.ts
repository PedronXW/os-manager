import { Installation } from '@/domain/enterprise/entities/installation';

export abstract class InstallationRepository {
  abstract createInstallation(installation: Installation): Promise<Installation>
  abstract updateInstallation(
    id: string,
    newInstallation: Installation,
  ): Promise<Installation>

  abstract deleteInstallation(id: string): Promise<void>
  abstract getAllInstallations(
    page: number,
    limit: number,
  ): Promise<Installation[]>

  abstract getInstallationById(id: string): Promise<Installation>
}
