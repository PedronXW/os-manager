import { Either, left, right } from '@/@shared/either'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ClientRepository } from '../../repositories/client-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteClientServiceRequest = {
  id: string
}

type DeleteClientServiceResponse = Either<
  | ClientNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  void
>

export class DeleteClientService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteClientServiceRequest): Promise<DeleteClientServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const clientExists = await this.clientRepository.getClientById(id)

    if (!clientExists) {
      return left(new ClientNonExistsError())
    }

    return right(await this.clientRepository.deleteClient(id))
  }
}
