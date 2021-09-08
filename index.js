const { Telegraf } = require("telegraf");
const math = require("mathjs");
require("dotenv").config();

const bot = new Telegraf(process.env.BOTTOKEN);
bot.launch();

bot.start((ctx) => {
	ctx.reply("Hola!, bienvenido.");
});
bot.help((ctx) => {
	ctx.reply("Hola!, En que puedo ayudarte.");
});
bot.settings((ctx) => {
	ctx.reply("Hola!, configuracion.");
});

bot.on("text", (ctx) => {
	const analizar = ctx.message.text.toLowerCase();

	// Expresion regular que verifica que existan numeros en el mensaje.
	const regexIncludeNumbers = /\d/;
	const hayNumeros = regexIncludeNumbers.test(analizar);

	if (analizar.includes("seno")) {
		ctx.reply("La derivada de seno es coseno");
	} else if (analizar.includes("coceno")) {
		ctx.reply("La derivada de coceno es -seno");
	} else if (
		(hayNumeros && analizar.includes("+")) ||
		analizar.includes("-") ||
		analizar.includes("*") ||
		analizar.includes("/") ||
		analizar.includes("^")
	) {
		ctx.replyWithHTML(
			`${analizar} => <b>resultado ${math.evaluate(
				analizar.replace(/[^0-9-+-/-*-^]/g, "")
			)}</b>`
		);
	}
});

bot.on("new_chat_members", (ctx) => {
	ctx.reply(`Bienvenido al grupo ${ctx.from.first_name}.`);
});

bot.mention("Moises", (ctx) => {
	ctx.reply(`Creador de ProfAliBot!`);
});
