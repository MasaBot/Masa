import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { getDefaultCommandEmbed } from "../helpers";
import Command from "./general";

export class HelpCommand extends Command {
  name = "help";
  desc = "List of helpful commands";
  aliases = ["commands"];
  builder = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.desc);

  handler = async (interaction: CommandInteraction): Promise<void> => {
    let embed = getDefaultCommandEmbed(interaction.user.username, interaction.user.avatarURL());

    embed.setTitle("List of commands");
    embed.setDescription("A list of helpful commands for noobs");

    await interaction.reply({embeds: [embed]})

    // let fields = Object.values(Commands.commands).map((command) => {
    //   if (!command.isAlias) {
    //     return {
    //       name: [command.commandName, ...command.aliases].join(", "),
    //       value: command.desc,
    //       inline: false,
    //     }
    //   }
    //   return null;
    // }).filter((value) => value != null) as EmbedFieldData[];

    // embed.addFields(fields);

    // msg.channel.send(embed);
  };

  constructor() {
    super();
  }
}



// Commands.addCommand(["help", "commands", "what"], "List of helpful commands", (msg) => {

  // });