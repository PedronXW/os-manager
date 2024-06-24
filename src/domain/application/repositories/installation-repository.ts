import { Installation } from '@/domain/enterprise/entities/installation/installation'

export type InstallationQueryResponse = {
  installations: Installation[]
  installationsQueryCount: number
}

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
  ): Promise<InstallationQueryResponse>

  abstract getInstallationById(id: string): Promise<Installation | undefined>
}
