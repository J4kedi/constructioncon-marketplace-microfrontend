import madge from 'madge';

describe('Arquitetura - dependências', () => {
  it('não deve haver dependência circular', async () => {
    const res = await madge('./src', { baseDir: __dirname });
    const circular = res.circular();
    expect(circular).toEqual([]);
  });

  it('camada de domínio não deve depender da infraestrutura', async () => {
    const res = await madge('./src/domain', { baseDir: __dirname });
    const deps = res.obj();
    for (const file in deps) {
      deps[file].forEach(dep => {
        expect(dep.includes('infrastructure')).toBe(false);
      });
    }
  });
});