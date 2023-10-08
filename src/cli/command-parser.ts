type ParsedCommand = Record<string, string[]>; // ключи - строки, значения - массив строк (пользовательские аргументы)

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    // Кроме обычных полей и методов класс может иметь статические. Статические поля и методы относятся не к отдельным объектам, а в целом к классу. И для обращения к статическим полям и методам
    // применяется имя класса. Статические поля и методы определяются с помощью ключевого слова static
    const parsedCommand: ParsedCommand = {}; // создаем объект с типом ParsedCommand
    let currentCommand = '';

    for (const argument of cliArguments) {
      //  перебираем введенные пользователем аргументы
      if (argument.startsWith('--')) {
        // если аргумент начинается на "--",
        parsedCommand[argument] = []; // то он становится ключом объекта со значением, равным пустому массиву
        currentCommand = argument; // а в currentCommand записываем значение этого аргумента
      } else if (currentCommand && argument) {
        // если currentCommand существует (не пустая строка), и также существует другой аргумент
        parsedCommand[currentCommand].push(argument); // то этот другой аргумент пушим в созданный пустой массив значения объекта
      }
    }

    return parsedCommand;
  }
}
