import config from '@common/config';
import { User } from '@models/User';
import * as Passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ExpressApplication, Inject, Service } from 'ts-express-decorators';
import { UserService } from './user.service';

@Service()
export class PassportJwtService {
    
    constructor(
        private userService: UserService,
        @Inject(ExpressApplication) private  expressApplication: ExpressApplication) {
        
        const opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtSecret,
        };
        this.expressApplication.use(Passport.initialize());
        
        Passport.use(new Strategy(opts, (jwtPayload, done) => {
            User.findById(jwtPayload.id, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }
    
    public authenticate(req, res, next) {
        Passport.authenticate('jwt', { session: false })(req, res, next);
    }
    
}
