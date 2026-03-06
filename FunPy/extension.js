const vscode = require('vscode');

// FunPy messages
const messages = [
    {pattern: /def .*\(.*\):/g, message: "Function incoming! Hope it’s not spaghetti 🍝"},
    {pattern: /for .* in .*:/g, message: "Loopity loop! Round and round we go 🔄"},
    {pattern: /while .*:/g, message: "Careful! This could be an infinite ride 🎢"},
    {pattern: /import .*;/g, message: "Semicolon? Python says ‘LOL nope’ 😹"},
    {pattern: /print\(.*\)/g, message: "Print party! 🖨️ Who invited the output?"},
    {pattern: /class .*/g, message: "A class act! Fancy pants Python detected 🎩"},
    {pattern: /#/g, message: "Comment time! Whispering secrets to the code 🕵️‍♂️"},
    {pattern: /\bif\b/g, message: "Decisions, decisions… If only life were this easy 🤔"},
    {pattern: /\belse\b/g, message: "Plot twist! Else sneaks in like a ninja 🥷"},
    {pattern: /\belif\b/g, message: "Elif squad assembling! Options galore 🎮"},
    {pattern: /\btry\b/g, message: "Trying is the new winning 💪"},
    {pattern: /\bexcept\b/g, message: "Caught ya! Exception dodged like a pro 🏃‍♀️"},
    {pattern: /\bfinally\b/g, message: "Finally… closure! Cue dramatic music 🎼"},
    {pattern: /\braise\b/g, message: "Raising trouble! Watch out ⚠️"},
    {pattern: /\bwith\b/g, message: "With great code comes great responsibility 🕷️"},
    {pattern: /\bas\b/g, message: "Alias detected! Incognito mode activated 🕶️"},
    {pattern: /\bassert\b/g, message: "Assert dominance! Python flex 💪"},
    {pattern: /\blambda\b/g, message: "Anonymous powers! Secret function spotted 🕵️‍♀️"},
    {pattern: /\bpass\b/g, message: "Pass… literally doing nothing. Genius move 😌"},
    {pattern: /\bbreak\b/g, message: "Break time! Go grab coffee ☕"},
    {pattern: /\bcontinue\b/g, message: "Carry on my wayward coder 🎵"},
    {pattern: /\bin\b/g, message: "Are you IN? Membership exclusive 🏰"},
    {pattern: /\bis\b/g, message: "Identity crisis! Are you really you? 🤯"},
    {pattern: /\bdel\b/g, message: "Delete like Thanos snap! ✨💥"},
    {pattern: /\bglobal\b/g, message: "Global domination mode: ON 🌎"},
    {pattern: /\bnonlocal\b/g, message: "Nonlocal sneaky moves! Shh 🤫"},
    {pattern: /\breturn\b/g, message: "Return of the value! 🎬 Epic sequel"},
    {pattern: /\byield\b/g, message: "Yielding control… zen mode activated 🧘‍♀️"},
    {pattern: /\bimport\b/g, message: "Magic imports incoming! 🧙‍♂️ Abracadabra!"},
    {pattern: /\bfrom\b/g, message: "From far away… Python gifts delivered 🎁"},
    {pattern: /\bnot\b/g, message: "Negation strikes! Nope, not today ❌"},
    {pattern: /\band\b/g, message: "Logical AND! Teamwork makes the dream work 🤝"},
    {pattern: /\bor\b/g, message: "Logical OR! Pick your path 🔀"},
    {pattern: /\bTrue\b/g, message: "True dat! ✅"},
    {pattern: /\bFalse\b/g, message: "False alarm! 🚨 Whoopsie!"},
    {pattern: /\bNone\b/g, message: "Void vibes… Nothing to see here 🕳️"},
    {pattern: /\basync\b/g, message: "Async magic! Python on steroids 💨"},
    {pattern: /\bawait\b/g, message: "Awaiting… patience is a virtue 🐢"},
    {pattern: /\bself\b/g, message: "Self-awareness activated 🤖"},
    {pattern: /\b__init__\b/g, message: "Constructor mode! Objects incoming 🚀"},
    {pattern: /\b__str__\b/g, message: "Stringify me! Make me human-readable 😎"},
    {pattern: /\b__repr__\b/g, message: "Representation matters! Pose for the code 📸"},
    {pattern: /\bstaticmethod\b/g, message: "Static method alert! No instance, no problem 🏗️"},
    {pattern: /\bclassmethod\b/g, message: "Class method! Sharing is caring 🤲"},
    {pattern: /\blist\b/g, message: "List spotted! Let’s collect the loot 🗃️"},
    {pattern: /\bdict\b/g, message: "Dictionary! Words + meanings = power 💥"},
    {pattern: /\bset\b/g, message: "Unique vibes only! Set detected ✨"},
    {pattern: /\btuple\b/g, message: "Tuple forever! Immutable like your coffee addiction ☕"},
    {pattern: /\bint\b/g, message: "Integer incoming! Whole numbers assemble 🔢"},
    {pattern: /\bfloat\b/g, message: "Floaty numbers! Decimals in the air 🌊"},
    {pattern: /\bstr\b/g, message: "Strings attached! Words matter ✍️"},
    {pattern: /\bbool\b/g, message: "Boolean buddies! True or False? 🎲"},
    {pattern: /\btype\b/g, message: "What type are you? Detective mode 🕵️‍♂️"},
    {pattern: /\bisinstance\b/g, message: "Instance check! Are you the chosen one? 🧙‍♂️"},
    {pattern: /\bhelp\b/g, message: "Help summoned! Heroic Python incoming 🦸‍♀️"},
    {pattern: /\bdir\b/g, message: "Peek into the directory… secrets revealed 👀"},
    {pattern: /\bmin\b/g, message: "Minimum vibes only! Small but mighty 🐜"},
    {pattern: /\bmax\b/g, message: "Maximum hype! Go big or go home 💪"},
    {pattern: /\bsum\b/g, message: "Summing it all up! Math party ➕"},
    {pattern: /\bsorted\b/g, message: "Sorting chaos into order… zen achieved 🧘‍♂️"},
    {pattern: /\benumerate\b/g, message: "Enumerate like a boss! Count ‘em all 🔢"},
    {pattern: /\bzip\b/g, message: "Zip it up! Tidy and neat 🎀"},
    {pattern: /\bmap\b/g, message: "Mapping magic! Transform everything 🪄"},
    {pattern: /\bfilter\b/g, message: "Filter the nonsense! Crystal clear 💎"},
    {pattern: /\breduce\b/g, message: "Reduce the chaos! Simplify life 🧩"},
    {pattern: /\blen\b/g, message: "Length matters! Measure twice 📏"},
    {pattern: /\bopen\b/g, message: "Open sesame! Peek inside files 📂"},
    {pattern: /\bread\b/g, message: "Reading… knowledge incoming 📖"},
    {pattern: /\bwrite\b/g, message: "Write your destiny! Code it ✍️"},
    {pattern: /\bappend\b/g, message: "Append like a wizard! Add it all 🪄"},
    {pattern: /\bpop\b/g, message: "Pop goes the element! 🎉 Magic trick!"},
    {pattern: /\bremove\b/g, message: "Remove it… vanish! 🪄✨"},
    {pattern: /\bindex\b/g, message: "Index detected! Where am I? 🧭"},
    {pattern: /\bsplit\b/g, message: "Split it like a boss! ✂️"},
    {pattern: /\bjoin\b/g, message: "Join forces! Together we win 🤝"},
    {pattern: /\breplace\b/g, message: "Replace it! Out with the old 🔄"},
    {pattern: /\bfind\b/g, message: "Find it! Sherlock Python 🕵️‍♀️"},
    {pattern: /\bcount\b/g, message: "Count ‘em up! One, two, three… 🔢"},
    {pattern: /\bformat\b/g, message: "Formatting fun! Make it pretty 🎨"},
    {pattern: /\bf-strings\b/g, message: "f-string alert! Fancy pants formatting ✨"},
    {pattern: /\binput\b/g, message: "User input requested… type like the wind ⌨️"},
    {pattern: /\beval\b/g, message: "Evaluate! Are you feeling lucky? 🎰"},
    {pattern: /\bexec\b/g, message: "Execute code! Full throttle 🚀"},
    {pattern: /\bcompile\b/g, message: "Compiling… transformers engaged ⚙️"},
    {pattern: /\bglobals\b/g, message: "Global takeover! 🌍"},
    {pattern: /\blocals\b/g, message: "Local gossip! What’s in your scope? 🏡"},
    {pattern: /\b__name__\b/g, message: "__name__ detected! Special powers unlocked ⚡"},
    {pattern: /\b__main__\b/g, message: "Main event! Lights, camera, code 🎬"},
    {pattern: /\bdelattr\b/g, message: "Deleting an attribute… vanish! 🪄"},
    {pattern: /\bgetattr\b/g, message: "Getting attributes! Curious Python 🐱"},
    {pattern: /\bsetattr\b/g, message: "Setting attributes! Power mode ON 💪"},
    {pattern: /\bhasattr\b/g, message: "Has it? Attribute check! 🔍"},
    {pattern: /\bcallable\b/g, message: "Callable detected! Ring ring 📞"},
    {pattern: /\bEllipsis\b/g, message: "Ellipsis… mystery Python vibes 👀"},
    {pattern: /\bNotImplemented\b/g, message: "NotImplemented! Coming soon… ⏳"},
];

// Check the Python code and show a random FunPy message
function checkCodeMood(document) {
    if (!document || document.languageId !== 'python') return;

    const text = document.getText();
    let feedback = [];

    messages.forEach(msg => {
        const matches = text.match(msg.pattern);
        if (matches) {
            feedback.push(msg.message);
        }
    });

    if (feedback.length > 0) {
        // Show one random message
        vscode.window.showInformationMessage(feedback[Math.floor(Math.random() * feedback.length)]);
    }
}

function activate(context) {
    console.log('FunPy is now active!');

    // Command to manually check mood
    let disposable = vscode.commands.registerCommand('funpy.checkMood', () => {
        const editor = vscode.window.activeTextEditor;
        checkCodeMood(editor?.document);
    });

    // Automatically run when saving Python files
    vscode.workspace.onDidSaveTextDocument(doc => {
        checkCodeMood(doc);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    console.log('FunPy deactivated!');
}

module.exports = { activate, deactivate };