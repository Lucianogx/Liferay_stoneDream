# Liferay_stoneDream

Projeto baseado em Liferay Workspace, com módulos customizados para desenvolvimento de widgets e funcionalidades específicas.

## Estrutura do Projeto

```
stoneDream/
├── configs/                # Configurações para diferentes ambientes (dev, prod, docker, etc)
├── modules/                # Módulos customizados (widgets, serviços, etc)
│   ├── noticias-react-widget/   # Widget React para notícias
│   └── reserva-quartos/         # Widget para reserva de quartos
├── themes/                 # Temas customizados
├── imagens/                # Imagens do projeto
├── bundles/                # Bundles do Liferay
├── build.gradle            # Configuração do Gradle
├── settings.gradle         # Configuração de workspaces do Gradle
├── Dockerfile.ext          # Dockerfile para extensões
└── GETTING_STARTED.markdown# Guia rápido de uso
```

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Java 8+](https://adoptopenjdk.net/)
- [Liferay Blade CLI](https://learn.liferay.com/dxp/latest/en/developing-applications/tooling/blade-cli/getting-started-with-blade-cli.html)
- Docker (opcional, para rodar em container)

## Instalação

Clone o repositório:
```bash
git clone https://github.com/Lucianogx/Liferay_stoneDream.git
cd Liferay_stoneDream
```

Instale as dependências:
```bash
yarn install
```

## Como rodar o Liferay DXP localmente

```bash
blade gw initBundle
blade gw deploy
blade server run
```

## Como rodar o Liferay DXP via Docker

```bash
blade gw createDockerContainer
blade gw startDockerContainer
```

## Módulos Disponíveis

- **noticias-react-widget**: Widget em React para exibição de notícias.
- **reserva-quartos**: Widget para gerenciamento e reserva de quartos.

Cada módulo possui seu próprio README com instruções específicas.

## Documentação

Para mais detalhes, consulte o arquivo [GETTING_STARTED.markdown](GETTING_STARTED.markdown) ou a [documentação oficial do Liferay Workspace](https://learn.liferay.com/dxp/7.x/en/developing-applications/tooling/liferay-workspace.html).

## Licença

Este projeto está licenciado sob a licença GPL-3.0. 