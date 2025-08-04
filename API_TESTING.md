# 🚀 API Testing Suite

Comprehensive testing suite for all APIs in the hackathon project with interactive menu and domain switching capabilities.

## 🎯 Features

- **Interactive Menu**: Choose individual tests or run all tests
- **Domain Switching**: Test on production or localhost
- **Colorized Output**: Beautiful colored terminal output  
- **Command Line Options**: Support for automated testing
- **Progress Indicators**: Clear feedback on test execution
- **Error Handling**: Graceful error handling and user guidance

## 🌐 Supported Domains

### Production
```
Base URL: https://zah-2.123c.vn/hackathon/api
```

### Localhost  
```
Base URL: http://localhost:3000
```

## 📋 Available APIs

1. **idea-to-analysis** - Transform ideas into structured analysis
2. **product-critique** - Critique product analysis boards  
3. **solution-architect** - Generate solution architecture analysis
4. **solution-to-ui** - Convert solutions to HTML UI
5. **assessment-center** - Assess candidates with complex data

## 🚀 Usage

### Interactive Mode (Recommended)
```bash
./test-all-apis.sh
```

This launches an interactive menu where you can:
- Choose individual API tests (1-5)
- Run all tests at once (6)
- Switch between production ↔ localhost (7)
- View current settings (8)
- Exit (9)

### Command Line Mode

#### Run All Tests
```bash
# Run all tests on current domain (default: production)
./test-all-apis.sh --all

# Run all tests on production  
./test-all-apis.sh --all --production
./test-all-apis.sh --all -p

# Run all tests on localhost
./test-all-apis.sh --all --localhost  
./test-all-apis.sh --all -l
```

#### Set Domain Only
```bash
# Set to production (then enter interactive mode)
./test-all-apis.sh --production
./test-all-apis.sh -p

# Set to localhost (then enter interactive mode)
./test-all-apis.sh --localhost
./test-all-apis.sh -l
```

#### Help
```bash
./test-all-apis.sh --help
./test-all-apis.sh -h
```

## 🎨 Interactive Menu

```
╔══════════════════════════════════════════════════════════════╗
║                    🚀 API Testing Suite                      ║
║                     Hackathon Project                        ║
╚══════════════════════════════════════════════════════════════╝

Current Settings:
  Domain: production
  Base URL: https://zah-2.123c.vn/hackathon/api

📋 Test Menu:
  1) Test idea-to-analysis API
  2) Test product-critique API
  3) Test solution-architect API
  4) Test solution-to-ui API
  5) Test assessment-center API
  6) Run all tests
  7) Switch domain (production ↔ localhost)
  8) Show current settings
  9) Exit

Choose an option (1-9):
```

## 📊 Test Data

Each API test includes realistic sample data:

### 1. idea-to-analysis
- **Input**: Product Owner improving 7-day retention in English learning app
- **Language**: Vietnamese
- **Context**: Product improvement

### 2. product-critique
- **Input**: Analysis board with Day-7 retention goal (22% → 35%)
- **Segments**: University students, professionals, busy parents
- **Language**: English

### 3. solution-architect  
- **Input**: Detailed Vietnamese analysis board
- **Focus**: Gamification, push notifications, onboarding
- **Language**: Vietnamese

### 4. solution-to-ui
- **Input**: Problem statement + "The Safe Bet" approach
- **Output**: HTML user interface
- **Language**: Vietnamese

### 5. assessment-center
- **Input**: Complex analysis board + product critique
- **Features**: Scoring system with detailed rationale
- **Language**: Mixed (English + Vietnamese)

## 🔧 Requirements

### Required
- `bash` - Shell environment
- `curl` - HTTP client for API requests

### Optional but Recommended  
- `jq` - JSON formatter for pretty output

Install jq:
```bash
# Ubuntu/Debian
sudo apt install jq

# macOS  
brew install jq

# Without jq, responses will still work but won't be formatted
```

## 📈 Expected Responses

### idea-to-analysis
```json
{
  "analysis_board": {
    "product_goal": "...",
    "user_problem_goal": {...},
    "target_segments": [...],
    "user_insights_data": [...],
    "scope": {...},
    "success_metrics": [...]
  }
}
```

### product-critique
```json
{
  "overall_summary": "...",
  "critique_points": [
    {
      "category": "...",
      "critique": "...",
      "challenge_question": "..."
    }
  ]
}
```

### solution-architect
```json
{
  "problem_statement": "...",
  "solution_analysis": [...],
  "comparison_summary": {
    "heuristic_evaluation": [...],
    "prioritization_matrix": [...],
    "recommendation": "..."
  }
}
```

### solution-to-ui
```json
{
  "html_content": "<!DOCTYPE html>...",
  "response_id": "resp_..."
}
```

### assessment-center
```json
{
  "scores": {
    "strategic_alignment": 55,
    "authenticity_and_evidence": 90,
    "clarity_and_specificity": 95,
    "risk_awareness": 75
  },
  "overall_score": 75.75,
  "rationale": {...}
}
```

## 🎯 Quick Start Examples

### Test Everything on Production
```bash
./test-all-apis.sh --all -p
```

### Test Specific API on Localhost
```bash
./test-all-apis.sh -l
# Then choose option 3 for solution-architect
```

### Interactive Testing Session
```bash
./test-all-apis.sh
# Use menu to switch domains and test individual APIs
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused (localhost)**
   - Make sure your NestJS server is running: `npm run start:dev`
   - Check if port 3000 is available

2. **Network Errors (production)**  
   - Check internet connection
   - Verify production server is running

3. **JSON Parse Errors**
   - Install jq: `sudo apt install jq`
   - Or remove `| jq '.'` from script if jq unavailable

4. **Permission Denied**
   - Make script executable: `chmod +x test-all-apis.sh`

### Debug Mode
Add `-v` to curl commands for verbose output:
```bash
# Edit the script and add -v flag to curl commands
curl -v -s -X POST "..." 
```

## 🔄 Workflow Examples

### Development Workflow
```bash
# 1. Start local server
npm run start:dev

# 2. Test locally  
./test-all-apis.sh -l

# 3. Test specific API
# Choose option 1-5 from menu

# 4. Switch to production for comparison
# Choose option 7 to switch domain
```

### CI/CD Integration
```bash
# Automated testing in scripts
./test-all-apis.sh --all --production
./test-all-apis.sh --all --localhost
```

## 📝 Notes

- **Default domain**: Production
- **Color support**: Automatic detection
- **Error handling**: Graceful fallbacks
- **Cross-platform**: Works on Linux, macOS, WSL
- **Vietnamese support**: Full UTF-8 compatibility

Perfect for development, testing, and CI/CD pipelines! 🎉 