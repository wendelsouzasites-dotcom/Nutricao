# Nutricionista - Site Institucional Premium

## 📋 Estrutura do Projeto

```text
Nutrição/
├── index.html                    # Arquivo HTML principal
├── README.md                     # Documentação do projeto
├── assets/
│   ├── css/
│   │   └── styles.css           # CSS principal com variáveis e estilos
│   ├── js/
│   │   └── main.js              # JavaScript para interações
│   └── images/
│       └── (imagens do projeto)
```

## ✅ Status do Projeto

### Estrutura Base (Concluído)

- [x] Estrutura de pastas
- [x] HTML semântico com todas as seções
- [x] CSS moderno com variáveis CSS
- [x] JavaScript leve para interações

### Seções Incluídas

1. [x] Header fixo minimalista
2. [x] Hero section full screen
3. [x] Sobre a Nutricionista
4. [x] Serviços (cards)
5. [x] Abordagem/Método
6. [x] Depoimentos
7. [x] Contato
8. [x] Footer

## 🎨 Decisões de Design

### Cores

- **Primary**: `#5A7D6E` (verde suave - natureza/saúde)
- **Accent**: `#C9A87C` (dourado/bege - elegância)
- **Background**: `#FAFAF8` (off-white sofisticado)

### Tipografia

- **Títulos**: Playfair Display (serifa moderna, elegante)
- **Textos**: Lato (sans-serif legível)

## 🔧 Próximos Passos

### Personalização Necessária

- [ ] Substituir "[Nome da Nutricionista]" pelo nome real
- [ ] Adicionar número de WhatsApp válido
- [ ] Substituir CRN pelo número correto
- [ ] Adicionar foto profissional na seção "Sobre"
- [ ] Atualizar e-mails de contato
- [ ] Personalizar texto conforme preferência
- [ ] Adicionar depoimentos reais

### Melhorias Futuras

- [ ] Adicionar galeria de fotos
- [ ] Implementar carrossel de depoimentos
- [ ] Adicionar blog/seção de artigos
- [ ] Integrar com Google Analytics
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Formulário de contato (além do WhatsApp)

## 📱 Responsividade

O site é **mobile-first** e responsivo:

- Desktop: Layout completo
- Tablet: Ajustes de grid
- Mobile: Menu hamburger, layout vertical

## 🚀 Como Usar

1. Abra `index.html` em um navegador
2. Para desenvolvimento, use um servidor local:

   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (se tiver instalado)
   npx serve
   ```

## 📦 Personalização de Cores

Para alterar as cores, edite as variáveis em `assets/css/styles.css`:

```css
:root {
    --color-primary: #5A7D6E;       /* Verde principal */
    --color-accent: #C9A87C;        /* Dourado/bege */
    --color-bg: #FAFAF8;            /* Fundo */
}
```

## 📄 Licença

Este template é de uso livre para fins comerciais e pessoais.
