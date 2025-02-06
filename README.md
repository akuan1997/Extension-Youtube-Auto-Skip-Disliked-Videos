# YouTube Auto Skip

A Chrome extension that automatically skips to the next video when the current video has been disliked by the user. This extension enhances your YouTube viewing experience by helping you avoid watching content you're not interested in.

## Features

- Automatically detects when you dislike a video
- Seamlessly skips to the next video in queue
- Works on YouTube watch pages
- Lightweight and efficient monitoring
- No external dependencies

## How It Works

The extension monitors your interactions with YouTube videos and:

1. Checks if you're on a YouTube watch page
2. Detects when you click the dislike button
3. Automatically clicks the "Next Video" button when a dislike is detected
4. Implements safeguards to prevent excessive checking and resource usage

## Installation

Clone this repository:

```bash
git clone https://github.com/yourusername/youtube-autoskip.git
```

Open Chrome and navigate to `chrome://extensions/`:

1. Enable "Developer mode" in the top right corner
2. Click "Load unpacked" and select the extension directory

## Technical Details

### Files

- `manifest.json`: Extension configuration and permissions
- `content.js`: Core functionality implementation

### Permissions Required

- `activeTab`: To interact with the current YouTube page
- `scripting`: To inject and execute scripts
- `storage`: For future feature implementations

### Implementation Details

- Uses `MutationObserver` to detect page changes
- Implements retry logic with maximum check limits
- Includes comprehensive error handling
- Features debug logging for troubleshooting

## Development

To modify or enhance the extension:

1. Make your changes to the source files
2. Reload the extension in Chrome
3. Test your changes on YouTube

## Debugging

The extension includes a logging system that outputs to the browser console. Messages are prefixed with `[YouTube AutoSkip]` for easy filtering.

## Future Enhancements

- Add user configuration options
- Implement statistics tracking
- Add support for custom skip conditions
- Expand browser compatibility
- Add localization support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This extension is not affiliated with, sponsored by, or endorsed by YouTube or Google.

## Support

If you encounter any issues or have suggestions, please open an issue in the GitHub repository.
