# nixsnap 📸

A CLI tool that shows your Linux system info in one command — CPU, RAM, Disk, Processes and more.

Instead of typing 5 different commands, just type:

```bash
nixsnap snap
```

## Features

- 🖥️ CPU usage and model
- 🧠 RAM usage
- 💾 Disk usage
- ⚙️ Top 10 running processes
- 👁️ Live watch mode

## Installation

```bash
npm install -g nixsnap
```

## Usage

```bash
# Full system snapshot
nixsnap snap

# Top 10 running processes
nixsnap processes

# Live monitor (updates every 2 seconds)
nixsnap watch
```

## Built With

- TypeScript
- Node.js
- Commander.js
- systeminformation

## Author

Christina Rajakumari — [@ChristinaRajakumari2005](https://github.com/ChristinaRajakumari2005)

## License

MIT