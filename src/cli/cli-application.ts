import { Command } from "./commands/command.interface.js";
import { CommandParser } from "./command-parser.js";

type CommandCollection = Record<string, Command>; // Record - это один из утилитарных типов в TypeScript, который позволяет создавать объекты с определенным набором ключей и однотипными значениями.
//  Это полезно, когда нужно гарантировать, что объект будет содержать определенные ключи и значения определенного типа. В данном случае ключи должны быть строками, а значения берутся на основе созданного интерфейса команд

export class CLIApplication {
  private commands: CommandCollection = {}; //  Объект с типом CommandCollection, который  будет хранить всю информацию о командах

  constructor(private readonly defaultCommand: string = "--help") {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        // Проверяем, содержит ли объект с командами команду с конкретным именем
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command; // В свойство объекта с ключом имени команды записывается новый экземпляр команды
      // console.log(command);
    });
    // console.log(commandList);

    // console.log(this.commands);
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `The default command (${this.defaultCommand}) is not registered.`
      );
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    // argv  -  пользовательский ввод (массив строк)
    const parsedCommand = CommandParser.parse(argv); // разбираем пользовательский ввод через заготовленный статический метод класса CommandParser
    const [commandName] = Object.keys(parsedCommand); // получаем массив ключей объекта parsedCommand
    const command = this.getCommand(commandName); // получаем экземпляр команды
    const commandArguments = parsedCommand[commandName] ?? []; // получаем аргументы команды
    command.execute(...commandArguments); // к новому экземпляру команды применяем метод execute
  }
}
