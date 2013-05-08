runWhen
=======

runWhen is a library for executing code you want to run at some arbitrary time in the future under some arbitrary
condition.  It is built using a singleton pattern, so it’s not meant to be instantiated.  You use it by either calling
“runWhen.submitJob(condition, code)” or by calling “runWhen.submitUniqueJob(jobName, condition, code)”.
<pre>
methods:

  privateRun:
		This is a private method that the user should not directly execute.  
		The method is in public method scope because it must be globally reachable.  
		privateRun is auto executed at the end of a submit method.

	submitJob :
		This method the first two arguments are required.  
		This method queues up jobs to run, and will allow you to continue to queue the same job.
		Once the job meets the test conditions and is ran it is then dequeued.  
		Arguments:
			boolTestCondition [required]:
				This is the condition to be tested and should result in a bool value. 
				The condition must be passed as a string.
				i.e.: “$(‘.myClass’).length > 0”
			codeToRun [required]:
				This is the code that will be executed when the test condition becomes true. 
				The code must be passed as a string.	
				i.e.: “$(‘.myClass’).hide()”
			lengthToWait[optional]:
				The time in milliseconds to wait before testing again.
				Default is 10 ms.
			timesToTry [optional]:
				The number of times to try before quitting.
				0 is unlimited.
				Default is 0.

	submitUniqueJob :
		This method the three two arguments are required.  
		This method requires a unique job identifier, which stops you from queuing a job with the same identifier more 
		than once.
		An attempt to queue a job with an existing identifier will over write the existing job.
		Once the job meets the test conditions and is ran it is then dequeued.  
		Arguments:
			jobName [required]:
				This is unique job identier passed in as a string.
				i.e.: ‘testIfMyClassIsShowing’
			boolTestCondition [required]:
				This is the condition to be tested and should result in a bool value. 
				The condition must be passed as a string.
			i.e.: “$(‘.myClass’).length > 0”
			codeToRun [required]:
				This is the code that will be executed when the test condition becomes true. 
				The code must be passed as a string.	
				i.e.: “$(‘.myClass’).hide()”
			lengthToWait[optional]:
				The time in milliseconds to wait before testing again.
				Default is 10 ms.
				i.e: 100
			timesToTry [optional]:
				The number of times to try before quitting.
				0 is unlimited.
				Default is 0.
				i.e.: 60

	removeJob:
		This method is usually used for internal use only, as the user may not know the job ID.
		However, if the user submitted a unique job he would have the job ID and could manually dequeue the job.
		Arguments:
			job:
				This is the jobs unique job id.
				i.e.: ‘testIfMyClassIsShowing’
	terminateJobs:
		This method, as the name implies, terminates all jobs.
		</pre>
