#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand } from "./cli/index.js";

function bootstrap() {
  const cliApplication = new CLIApplication(); //  создаем экземпляр нашего приложения
  cliApplication.registerCommands([new HelpCommand(), new VersionCommand()]); //  регистрируем наши команды, т.е. создаем экземпляры команд

  cliApplication.processCommand(process.argv);
}

bootstrap();
