import { AuthService } from "./services/auth.service";
import { UpdateUserService, UserService } from "./services/user.service";

export const APPLICATION_SERVICES = [
    UserService,
    UpdateUserService,
    AuthService
]