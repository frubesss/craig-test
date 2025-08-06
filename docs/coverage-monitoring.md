# Test Coverage Monitoring System

This repository includes an automated test coverage monitoring system that helps maintain code quality and ensures adequate test coverage.

## Overview

The system consists of:
- **Daily GitHub Actions Workflow**: Automatically runs coverage analysis and manages GitHub issues
- **Local Analysis Tools**: Scripts and npm commands for development-time coverage checking
- **Automated Issue Management**: Creates, updates, and closes GitHub issues based on coverage metrics

## How It Works

### Daily Automated Analysis

Every day at 9 AM UTC, the `daily-coverage-check.yml` workflow:

1. **Runs Tests**: Executes all tests with coverage reporting
2. **Analyzes Metrics**: Compares coverage against 80% thresholds for:
   - Statements coverage
   - Branches coverage
   - Functions coverage
   - Lines coverage
3. **File-Level Analysis**: Identifies specific files that need additional tests
4. **Issue Management**: 
   - Creates a GitHub issue if any overall metric is below 80%
   - Updates existing issues with the latest coverage report
   - Closes issues when all metrics meet or exceed thresholds
5. **Provides Recommendations**: Offers specific suggestions for improving test coverage

### Coverage Thresholds

| Metric | Threshold | Description |
|--------|-----------|-------------|
| Statements | 80% | Percentage of executable statements covered by tests |
| Branches | 80% | Percentage of code branches (if/else, switch) covered |
| Functions | 80% | Percentage of functions/methods called by tests |
| Lines | 80% | Percentage of lines executed by tests |

### Issue Management Logic

- **Issue Created**: When any overall coverage metric falls below 80%
- **Issue Updated**: Daily with latest coverage report while metrics are below threshold
- **Issue Closed**: When all metrics meet or exceed 80% threshold

## Local Development Tools

### npm Scripts

```bash
# Run tests with coverage reporting
npm run test:coverage

# Run comprehensive coverage analysis with recommendations
npm run coverage:analyze
```

### Manual Scripts

```bash
# Comprehensive local analysis
./scripts/coverage-analysis.sh

# Test workflow logic (for development)
./scripts/test-workflow-logic.sh
```

## Understanding Coverage Reports

### HTML Report
After running coverage, open `coverage/lcov-report/index.html` in your browser for a detailed visual report showing:
- Line-by-line coverage highlighting
- File-by-file breakdown
- Interactive navigation

### Console Output
The terminal output shows:
- Overall coverage percentages
- Files with coverage below thresholds
- Specific areas needing attention
- Actionable improvement suggestions

## Improving Coverage

When files are flagged for low coverage, consider:

1. **Unit Tests**: Add tests for individual functions and methods
2. **Integration Tests**: Test complex workflows and user interactions
3. **Edge Cases**: Test error conditions and boundary scenarios
4. **Branch Coverage**: Ensure all if/else and switch paths are tested

## Common Low-Coverage Files

Some files commonly have low coverage and may not need additional tests:
- `src/index.tsx` - Entry point files (often excluded from coverage requirements)
- `src/reportWebVitals.ts` - Optional analytics (often excluded)
- Type definition files (`.d.ts`)

## Customizing Thresholds

To modify coverage thresholds:

1. **Workflow**: Edit thresholds in `.github/workflows/daily-coverage-check.yml`
2. **Local Script**: Edit thresholds in `scripts/coverage-analysis.sh`
3. **Jest Config**: Add coverage thresholds to `package.json` or `jest.config.js`

Example Jest configuration:
```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Manual Workflow Trigger

The workflow can be triggered manually:
1. Go to the GitHub repository
2. Click on the "Actions" tab
3. Select "Daily Coverage Analysis"
4. Click "Run workflow"

This is useful for:
- Testing the workflow after setup
- Getting immediate coverage feedback
- Debugging workflow issues

## Troubleshooting

### Workflow Issues
- Check the Actions tab for detailed logs
- Ensure repository has Issues enabled
- Verify the workflow has proper permissions

### Coverage Issues
- Ensure all test files are properly configured
- Check for syntax errors in test files
- Verify jest/testing-library dependencies are installed

### Local Script Issues
- Ensure Node.js is installed
- Run `npm install` to install dependencies
- Check script permissions with `chmod +x scripts/*.sh`