const Discord = require('discord.js');

const Client = new Discord.Client();

const config = require('./config.json')

const letter = 'n'; const Letter = 'N'; const censor = '"'

const prefix = '='

const HelpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help Menu')
    .setDescription('List of important stuff')
    .addFields(
            { name: 'List of commands', value: `${prefix}Help - Displays this menu
            ${prefix}Quadraric:` },
            //{ name: '\u200B', value: '\u200B' },
            { name: 'Quadratic solver (a) (b) (c)       ', value: 'Solves a quadratic where ax^2 +- bx +- c = 0', inline: true },
            { name: 'Quadratic factoriser ', value: 'Coming Soon', inline: true },
        )

    .setTimestamp()
    .setFooter("Help menu");

Client.once('ready', () => {
    console.log('MathsBot is online!')
})

Client.on('message', message =>{
    if(message.author.bot) return

    else if(message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(command === "help"){
            message.channel.send(HelpEmbed)
        }
        if(command === "quadratic"){
            const mode = args[0]

            if(mode === "solver"||"solve"){
                let Root1, Root2
                const ValA = args[1]
                const ValB = args[2]
                const ValC = args[3]

                let discriminant = ValB * ValB - 4 * ValA * ValC
                if(discriminant > 0){
                    Root1 = (-ValB + Math.sqrt(discriminant)) / (2 * ValA)
                    Root2 = (-ValB - Math.sqrt(discriminant)) / (2 * ValA)
                    message.channel.send("The two solutions are " + Root1 + " and " + Root2)
                } 
                else if(discriminant === 0){
                    Root1 = Root2 = -ValB / (2 * ValA)
                    message.channel.send("The two solutions are " + Root1 + " and " + Root2)
                }
                else if(discriminant < 0){
                    let RealRoot = (-ValB / (2 * ValA)).toFixed(3);
                    let ImagRoot = (Math.sqrt(-discriminant) / (2 * ValA)).toFixed(3);
                    message.channel.send(`The roots of quadratic equation are ${RealRoot} + ${ImagRoot}i and ${RealRoot} - ${ImagRoot}i`)
                }
            }  
            else if(mode === "factorise"||"factoriser"){
                message.channel.send("Factoriser is currently unavalable")
            }
            else if(args[0] !== "solver" || "factorise"){
                message.channel.send("Please specify solver or factoriser")
            }

        }   
    }
})
Client.login(config.token)