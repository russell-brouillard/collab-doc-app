import { getAuth } from '@clerk/express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const auth = getAuth(request);

      if (!auth || !auth.userId) {
        this.logger.error('Authentication failed: No valid auth object found');
        return false;
      }

      console.log('Authenticated User ID:', auth.userId);

      // Optionally attach user data to the request for further processing
      request.user = auth;

      return true;
    } catch (err) {
      this.logger.error(`Authentication failed: ${err.message}`);
      return false;
    }
  }
}
