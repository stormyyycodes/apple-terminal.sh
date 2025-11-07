// iSH-like Terminal Skeleton in JavaScript
// Drop into an HTML page: <script src="ish-terminal.js"></script>

(() => {
  // Create terminal container
  const term = document.createElement("div");
  term.style.cssText = `
    background-color: #000;
    color: #00ff88;
    font-family: monospace;
    padding: 10px;
    height: 100vh;
    overflow-y: auto;
    white-space: pre-wrap;
  `;
  document.body.style.margin = "0";
  document.body.appendChild(term);

  // Basic state
  let cwd = "~";
  const prompt = () => `root@ish:${cwd}# `;

  // Print to terminal
  const print = (text = "") => {
    const line = document.createElement("div");
    line.textContent = text;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  };

  // Input handler
  const newPrompt = () => {
    const line = document.createElement("div");
    const label = document.createElement("span");
    label.textContent = prompt();
    label.style.color = "#00ffaa";
    line.appendChild(label);

    const input = document.createElement("input");
    input.style.cssText = `
      background: none;
      border: none;
      outline: none;
      color: #00ff88;
      font-family: inherit;
      font-size: inherit;
      width: 80%;
    `;
    line.appendChild(input);
    term.appendChild(line);
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim();
        input.disabled = true;
        handleCommand(cmd);
      }
    });
  };

  // Command handler (expand later)
  function handleCommand(cmd) {
    switch (cmd) {
      case "":
        break;
      case "help":
        print("Available commands: help, clear, echo, exit");
        break;
      case "clear":
        term.innerHTML = "";
        break;
      case "exit":
        print("Session terminated.");
        return;
      default:
        if (cmd.startsWith("echo ")) print(cmd.slice(5));
        else print(`ish: command not found: ${cmd}`);
    }
    newPrompt();
  }

  // Startup
  print("iSH Terminal JS v0.1 — (mock shell)");
  print("Type 'help' to see available commands.");
  newPrompt();
})();
