import { EndpointInfo, EndpointMetadata, Next, OverrideMiddleware, Req, Res } from 'ts-express-decorators';
import { AuthenticatedMiddleware } from 'ts-express-decorators/lib/mvc/components/AuthenticatedMiddleware';
import { PassportJwtService } from '@services/passport-jwt.service';

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware {
    
    constructor(public passportJwtService: PassportJwtService) {}
    
    public use(
        @EndpointInfo() endpoint: EndpointMetadata,
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction) {
        this.passportJwtService.authenticate(req, res, next);
    }
}
