import { select, input, checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';

let metas = []; 

const cadastrarMeta = async () => {
    const meta = await input({ message: chalk.blue("Digite a meta:") });

    if (meta.length === 0) {
        console.log(chalk.red('A meta não pode ser vazia.'));
        return;
    }

    metas.push({
        value: meta,
        checked: false,
    });
    console.log(chalk.green(`Meta "${meta}" cadastrada com sucesso!`));
};

const listarMetas = async () => {
    if (metas.length === 0) {
        console.log(chalk.yellow("Nenhuma meta cadastrada."));
        return;
    }

    const choices = metas.map((m) => ({
        name: `${m.checked ? '✔️' : '❌'} ${m.value}`,
        value: m.value,
    }));

    const respostas = await checkbox({
        message: chalk.blue("Selecione as metas para marcar como concluídas:"),
        choices: choices,
        instructions: false,
    });

    if (respostas.length === 0) {
        console.log(chalk.yellow("Nenhuma meta selecionada!"));
        return;
    }

    metas.forEach((m) => {
        m.checked = respostas.includes(m.value);
    });

    console.log(chalk.green('Meta(s) marcadas como concluída(s):'));
    respostas.forEach(resposta => console.log(chalk.green(`- ${resposta}`)));
};

const mostrarAjuda = () => {
    console.log(chalk.cyan(`
    Ajuda:
    
    Esta aplicação permite que você gerencie suas metas diárias de forma simples e eficaz.
    
    Como funciona:
    1. **Cadastrar meta**: 
       - Você pode adicionar uma nova meta que deseja alcançar. Basta digitar a meta quando solicitado.
       
    2. **Listar metas**: 
       - Mostra todas as metas que você cadastrou. Você pode selecionar as metas que completou, que serão marcadas como concluídas.
       
    3. **Ajuda**: 
       - Mostra estas instruções sobre como usar a aplicação.
       
    4. **Sair**: 
       - Encerra a aplicação.
       
    Lembre-se: As metas que você marcar como concluídas poderão ser visualizadas com seu status atualizado na lista.
    `));
};

const start = async () => {
    console.log(chalk.bold.green("Bem-vindo ao Gerenciador de Metas!"));
    
    while (true) {
        const opcao = await select({
            message: chalk.blue("Menu:"),
            choices: [
                { name: "Cadastrar meta", value: "cadastrar" },
                { name: "Listar metas", value: "listar" },
                { name: "Ajuda", value: "ajuda" },
                { name: "Sair", value: "sair" },
            ],
        });

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta();
                break;
            case "listar":
                await listarMetas();
                break;
            case "ajuda":
                mostrarAjuda();
                break;
            case "sair":
                console.log(chalk.bold.green("Até a próxima!"));
                return;
        }
    }
};

start();
