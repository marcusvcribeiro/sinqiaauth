import { CanalMensagemPipe } from './canal-mensagem.pipe';

fdescribe('CanalMensagemPipe', () => {
  it('create an instance', () => {
    const translateService = jasmine.createSpyObj('TranslateService', ['instant']);
    const pipe = new CanalMensagemPipe(translateService);
    expect(pipe).toBeTruthy();
  });
  it('Deve devolver traducao para canal primario', () => {
    // Arrange
    const translateService = jasmine.createSpyObj('TranslateService', ['instant']);
    translateService.instant.and.returnValue('primario');
    const pipe = new CanalMensagemPipe(translateService);
    // Act
    const atual = pipe.transform(1);
    // Assert
    expect(translateService.instant).toHaveBeenCalledTimes(1);
    expect(translateService.instant).toHaveBeenCalledWith('campo.canalMensagemPrimario');
    expect(atual).toBe('primario');
  });
  it('Deve devolver traducao para canal secundario', () => {
    // Arrange
    const translateService = jasmine.createSpyObj('TranslateService', ['instant']);
    translateService.instant.and.returnValue('secundario');
    const pipe = new CanalMensagemPipe(translateService);
    // Act
    const atual = pipe.transform(2);
    // Assert
    expect(translateService.instant).toHaveBeenCalledTimes(1);
    expect(translateService.instant).toHaveBeenCalledWith('campo.canalMensagemSecundario');
    expect(atual).toBe('secundario');
  });
  const valoresAtualmenteDesconhecidos = ['', null, undefined, 0, 3, 4, 5, 6, 7, 8, 9, 10];
  for (const valor of valoresAtualmenteDesconhecidos) {
    it(`Deve devolver vazio para valor desconhecido ${valor}`, () => {
      // Arrange
      const translateService = jasmine.createSpyObj('TranslateService', ['instant']);
      const pipe = new CanalMensagemPipe(translateService);
      // Act
      const atual = pipe.transform(valor);
      // Assert
      expect(atual).toBe('');
    });
  }
});
