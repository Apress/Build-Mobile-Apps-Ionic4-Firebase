import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable()
export class SocialSharingService {
  constructor(private socialSharing: SocialSharing) {}

  share(message: string, url: string) {
    this.socialSharing.share(message, null, null, url);
  }
}
