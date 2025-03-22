import { TestBed, inject } from '@angular/core/testing';
import { UploadService } from './upload.service';

// Mockup FileList class for unit tests
class MockFileList implements FileList {
  constructor(private files: File[]) { }

  get length(): number {
    return this.files.length;
  }

  item(index: number): File {
    return this.files[index];
  }

  add(file: File) {
    this.files.push(file);
  }

  [index: number]: File;
}

// Helper function to create a list of files
function getRandomFileTypes(): File[] {
  return [
    new File(['RandomStringContentToSimulateFileSize'], 'myFile.txt', { type: 'text/plain' }),
    new File(['RandomStringContentToSimulateBiggerFileSizeForUnitTest'], 'myFile.csv', { type: 'text/csv' }),
    new File(['RandomStringContentToSimulateFileSize'], 'myFile.jpg', { type: 'image/jpeg' }),
    new File(['RandomStringContentToSimulateFileSize'], 'myFile.png', { type: 'image/png' }),
    new File(['RandomStringContentToSimulateBiggerFileSizeForUnitTest'], 'myFile.mp4', { type: 'video/mp4' }),
  ];
}

function fileWithType(type: string): File {
  return new File(['anyFileBits'], 'anyFilename', { type });
}

function fileWithName(name: string): File {
  return new File(['anyFileBits'], name);
}

describe('UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadService]
    });
  });

  it('Deve ser possivel criar ', inject([UploadService], (service: UploadService) => {
    expect(service).toBeTruthy();
  }));

  it('deve retornar todos os arquivos na configuração padrão', inject([UploadService], (service: UploadService) => {
    const fileList = new MockFileList(getRandomFileTypes());

    const result = service.parseFileList(fileList, '*', null, true);
    expect(result.addedFiles.length).toEqual(fileList.length);
    expect(result.rejectedFiles.length).toEqual(0);
  }));

  it('deve filtrar por tipo aceito', inject([UploadService], (service: UploadService) => {
    const jpegFile = fileWithType('image/jpeg');
    const pngFile = fileWithType('image/png');
    const mp4File = fileWithType('video/mp4');
    const fileList = new MockFileList([jpegFile, pngFile, mp4File]);
    const accept = 'image/*';

    const result = service.parseFileList(fileList, accept, null, true);
    expect(result.addedFiles).toEqual([jpegFile, pngFile]);
    expect(result.rejectedFiles).toEqual([mp4File]);
  }));

  it('deve filtrar por vários tipos aceitos', inject([UploadService], (service: UploadService) => {
    const jpegFile = fileWithType('image/jpeg');
    const pngFile = fileWithType('image/png');
    const mp4File = fileWithType('video/mp4');
    const fileList = new MockFileList([jpegFile, pngFile, mp4File]);
    const accept = 'image/png,video/mp4';

    const result = service.parseFileList(fileList, accept, null, true);
    expect(result.addedFiles).toEqual([pngFile, mp4File]);
    expect(result.rejectedFiles).toEqual([jpegFile]);
  }));

  it('deve filtrar por tipo e extensão de arquivo aceita', inject([UploadService], (service: UploadService) => {
    const fileWithJpegType = fileWithType('image/jpeg');
    const fileWithPngType = fileWithType('image/png');
    const fileWithTxtExtension = fileWithName('text.txt');
    const fileList = new MockFileList([fileWithJpegType, fileWithPngType, fileWithTxtExtension]);
    const accept = '.txt,image/png';

    const result = service.parseFileList(fileList, accept, null, true);
    expect(result.addedFiles).toEqual([fileWithPngType, fileWithTxtExtension]);
    expect(result.rejectedFiles).toEqual([fileWithJpegType]);
  }));

  it('deve filtrar por extensão de arquivo aceita ignorando maiúsculas e minúsculas', inject([UploadService], (service: UploadService) => {
    const txtFile = fileWithName('text.txt');
    const fileList = new MockFileList([txtFile]);
    const accept = '.TXT';

    const result = service.parseFileList(fileList, accept, null, true);
    expect(result.addedFiles).toEqual([txtFile]);
  }));

  it('deve filtrar por tipo de arquivo aceito ignorando maiúsculas', inject([UploadService], (service: UploadService) => {
    const txtFile = fileWithType('plain/text');
    const fileList = new MockFileList([txtFile]);
    const accept = 'PLAIN/TEXT';

    const result = service.parseFileList(fileList, accept, null, true);
    expect(result.addedFiles).toEqual([txtFile]);
  }));

  it('deve filtrar pelo tamanho máximo do arquivo', inject([UploadService], (service: UploadService) => {
    const fileList = new MockFileList(getRandomFileTypes());

    const result = service.parseFileList(fileList, '*', 50, true);
    expect(result.addedFiles.length).toEqual(3);
    expect(result.rejectedFiles.length).toEqual(2);
  }));

  it('deve lidar com o modo de seleção única', inject([UploadService], (service: UploadService) => {
    const fileList = new MockFileList(getRandomFileTypes());

    const result = service.parseFileList(fileList, '*', null, false);
    expect(result.addedFiles.length).toEqual(1);
    expect(result.addedFiles[0].name).toEqual('myFile.txt');
  }));
});
