#!/bin/bash

# Coverage Analysis Script
# This script runs the same coverage analysis as the GitHub Actions workflow
# but can be executed locally for development purposes.

set -e

echo "🧪 Running test coverage analysis..."

# Run tests with coverage
echo "Running tests with coverage reporting..."
npm test -- --coverage --watchAll=false --coverageReporters=text --coverageReporters=json-summary

# Check if coverage report was generated
if [ ! -f "coverage/coverage-summary.json" ]; then
    echo "❌ Error: Coverage report not generated!"
    exit 1
fi

echo ""
echo "📊 Coverage Analysis Results:"
echo "==============================="

# Extract and display coverage percentages
STMT_PCT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.statements.pct)")
BRANCH_PCT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.branches.pct)")
FUNC_PCT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.functions.pct)")
LINE_PCT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.lines.pct)")

# Define thresholds
STMT_THRESHOLD=80
BRANCH_THRESHOLD=80
FUNC_THRESHOLD=80
LINE_THRESHOLD=80

echo "Overall Coverage:"
printf "  Statements: %s%% (threshold: %s%%) %s\n" "$STMT_PCT" "$STMT_THRESHOLD" "$(node -e "console.log($STMT_PCT >= 80 ? '✅' : '❌')")"
printf "  Branches:   %s%% (threshold: %s%%) %s\n" "$BRANCH_PCT" "$BRANCH_THRESHOLD" "$(node -e "console.log($BRANCH_PCT >= 80 ? '✅' : '❌')")"
printf "  Functions:  %s%% (threshold: %s%%) %s\n" "$FUNC_PCT" "$FUNC_THRESHOLD" "$(node -e "console.log($FUNC_PCT >= 80 ? '✅' : '❌')")"
printf "  Lines:      %s%% (threshold: %s%%) %s\n" "$LINE_PCT" "$LINE_THRESHOLD" "$(node -e "console.log($LINE_PCT >= 80 ? '✅' : '❌')")"

echo ""
echo "📋 Files That May Need Additional Tests:"
echo "========================================="

# Find files with low coverage
node << 'EOF'
const fs = require('fs');
const coverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));

const lowCoverageFiles = [];

for (const [file, metrics] of Object.entries(coverage)) {
  if (file === 'total') continue;
  
  const issues = [];
  if (metrics.statements.pct < 80) issues.push(`Statements: ${metrics.statements.pct}%`);
  if (metrics.branches.pct < 80) issues.push(`Branches: ${metrics.branches.pct}%`);
  if (metrics.functions.pct < 80) issues.push(`Functions: ${metrics.functions.pct}%`);
  if (metrics.lines.pct < 80) issues.push(`Lines: ${metrics.lines.pct}%`);
  
  if (issues.length > 0) {
    const relativePath = file.replace(process.cwd() + '/', '');
    lowCoverageFiles.push(`  - ${relativePath}: ${issues.join(', ')}`);
  }
}

if (lowCoverageFiles.length === 0) {
  console.log('🎉 All files meet the coverage thresholds! Great job!');
} else {
  lowCoverageFiles.forEach(file => console.log(file));
  console.log('\n💡 Suggestions for Improvement:');
  console.log('  1. Add unit tests for uncovered functions and edge cases');
  console.log('  2. Add integration tests for complex user workflows'); 
  console.log('  3. Add error handling tests for exception scenarios');
  console.log('  4. Review untested branches and add conditional logic tests');
}
EOF

echo ""
echo "✨ Analysis complete!"
echo ""
echo "💡 Tip: You can view the detailed HTML coverage report by opening:"
echo "   coverage/lcov-report/index.html"
echo ""