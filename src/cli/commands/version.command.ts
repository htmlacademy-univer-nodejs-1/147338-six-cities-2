import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "./command.interface.js";

type PackageJSONConfig = {
  version: string;
};
function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, "version") // проверяем, имеет ли объект value свойство version
  );
}

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = "./package.json") {} // в конструктор записываются свойства, применяемые в качестве параметров

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), "utf-8"); // resolve решает проблемы, связанные с разницей в написании путей в разных операционных системах. Здесь получаем строку в формате JSON, содержащую файл
    console.log(jsonContent);
    const importedContent: unknown = JSON.parse(jsonContent); // unknown - тип, запрещающий применять методы к переменной. Распаршиваем строку, получаем обычный объект
    console.log(importedContent);
    if (!isPackageJSONConfig(importedContent)) {
      throw new Error("Failed to parse json content.");
    }

    return importedContent.version;
  }

  public getName(): string {
    return "--version";
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        // Оператор instanceof проверяет, принадлежит ли объект к определённому классу
        console.error(error.message);
      }
    }
  }
}
