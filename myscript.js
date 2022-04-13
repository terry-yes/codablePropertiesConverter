var body = document.body;
const myForm = document.getElementById('inputForm')
const textField = document.getElementById('textField')
const output = document.getElementById('output')
const textArea = document.getElementById("textArea")

output.textContent = "결과가 여기에 표시됩니다."

myForm.addEventListener('submit', function 콜백함수(e) {
    e.preventDefault();
    // console.log(textField.value);
    console.log(textArea.value);
    // output.textContent = textArea.textContent;
    let commands = textArea.value.split("\n")
    indent = "    "
    let result = `init(from decoder: Decoder) throws {
${indent}let values = try decoder.container(keyedBy: CodingKeys.self)
`
    for (command of commands) {
        if (command.length == 0) {
            continue;
        }
        console.log(command + "dfsdfsdf")
        let commandArr = command.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );;
        console.log(commandArr)
        let letOrVar = commandArr[0]
        let variableName = commandArr[1].split(":")[0]
        let typeName = commandArr[2].split("?")[0]
        let isOptional = commandArr[2].endsWith("?")
        // console.log(letOrVar, variableName, typeName, isOptional)
        // console.log("variableName: ", variableName)
        // console.log("typeName: ", typeName)
        // console.log("isOptional: ", isOptional)
        // console.log("--------------")
        let line = `${variableName} = try values.decodeIfPresent(${typeName}.self, forKey: .${variableName})`
        if (!isOptional) {
            line += ` ?? ""`
        }
        console.log(line)
        // result += `${line} </br>`
        result += `${indent}${line} \r\n`
    }
    result += `}`
    output.textContent = result


});