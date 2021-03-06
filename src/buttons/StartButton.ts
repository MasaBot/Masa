import assert from "assert";
import { MessageButtonStyleResolvable, ButtonInteraction, MessageEmbed } from "discord.js";
import Lang from "../classes/Lang";
import { PermissionScope } from "../classes/PermissionManager";
import { ServerHandler } from "../serverHandler";
import { GenericButton } from "./GenericButton";

export class StartButton extends GenericButton {
  readonly customId = "server_start";
  readonly labelLangPath = "buttons.start";
  readonly style = "PRIMARY";

  permissionScopes = [
    PermissionScope.StartServer
  ]

  handler = async (params: any, interaction: ButtonInteraction) => {
    const { serverName } = params;
    assert(serverName);

    const server = ServerHandler.getServerByName(serverName);
    assert(server);

    let embed = new MessageEmbed();

    if (!server.hasStreams) {
      await ServerHandler.start(serverName);
      embed.setDescription(Lang.parse("commands.start.started", { SERVER_NAME: serverName }));
    }else {
      embed.setDescription(Lang.parse("commands.start.alreadyOnline", { SERVER_NAME: serverName }));
    }

    await interaction.editReply({ embeds: [embed] });
  }

  setParameters!: (params: {
    serverName: string
  }) => this;
}