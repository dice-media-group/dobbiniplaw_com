const { execSync } = require('child_process');

try {
  console.log('Starting rollback to 82c94bb...');
  
  // Change to the repository directory and run git reset --hard
  const command = 'git reset --hard 82c94bb';
  const result = execSync(command, { 
    cwd: '/Users/carltanner/dev/vue/dobbiniplaw_com',
    encoding: 'utf8'
  });
  
  console.log('Git reset output:', result);
  
  // Check the status
  const status = execSync('git status', { 
    cwd: '/Users/carltanner/dev/vue/dobbiniplaw_com',
    encoding: 'utf8'
  });
  
  console.log('Current status:', status);
  
  console.log('✅ Rollback completed successfully!');
  
} catch (error) {
  console.error('❌ Error during rollback:', error.message);
  process.exit(1);
}
