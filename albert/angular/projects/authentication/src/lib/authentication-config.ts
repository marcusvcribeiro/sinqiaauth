export class AuthenticationConfig {
  stsServer: string;
  redirectUrl: string;
  clientId: string;
  responseType: string;
  scope: string;
  postLoginRoute: string;
  postLogoutRedirectUri: string;
  startCheckSession: boolean;
  silentRenew: boolean;
  silentRenewUrl: string;
  forbiddenRoute: string;
  unauthorizedRoute: string;
  maxIdTokenIatOffsetAllowedInSeconds: number;
}
