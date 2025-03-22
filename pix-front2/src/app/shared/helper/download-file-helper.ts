import { HttpResponse } from '@angular/common/http';

export class DownloadFile {
  public static downloadFile(response: HttpResponse<Blob>) {

    const contentType = response.headers.get('content-type');
    const contentDisposition = decodeURIComponent(response.headers.get('content-disposition')).replace(/\+/g, ' ');
    const fileName = contentDisposition.substring(contentDisposition.indexOf('=') + 2, contentDisposition.length - 1);

    const blob = new Blob(response.body instanceof Array ? response.body : [response.body], { type: contentType });

    if (window.navigator.msSaveOrOpenBlob) {
      return window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      document.body.appendChild(a);

      a.href = url;
      a.download = fileName;
      a.target = '_self';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}
