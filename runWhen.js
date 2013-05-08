/*
Title:    runWhen
Auther:   James R. Brown
Version:  1.0
License:
  The MIT License (MIT)
    Copyright (c) 2013 James R. Brown
	
	Permission is hereby granted, free of charge, to any person obtaining 
	a copy of this software and associated documentation files (the "Software"), 
	to deal in the Software without restriction, including without limitation 
	the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software 
	is furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in 
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
	PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
	CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/



var runWhen = {
    boolTestCondition: new Object,
    codeToRun: new Object,
    lengthToWait: new Object,
    timesToTry: new Object,
    timesTried: new Object,
    jobIndex: 0, 
    submitUniqueJob: function(jobName, boolTestCondition, codeToRun, lengthToWait, timesToTry){
        //first three args required
        if(typeof jobName == "undefined") return;
        if(typeof boolTestCondition == "undefined") return;
        if(typeof codeToRun == "undefined") return;
        var job = jobName;
        this.boolTestCondition[job] = boolTestCondition;
        this.codeToRun[job] = codeToRun;
        typeof lengthToWait == 'undefined' ? this.lengthToWait[job] = 10 : this.lengthToWait[job] = lengthToWait;
        typeof timesToTry == 'undefined' ? this.timesToTry[job] = 0 : this.timesToTry[job] = timesToTry;
        this.timesTried[job] = 0;
        this.privateRun(job);
    },
    submitJob: function (boolTestCondition, codeToRun, lengthToWait, timesToTry){
        //first two args required
        if(typeof boolTestCondition == "undefined") return;
        if(typeof codeToRun == "undefined") return;
        var job = this.jobIndex++;
        this.boolTestCondition[job] = boolTestCondition;
        this.codeToRun[job] = codeToRun;
        typeof lengthToWait == 'undefined' ? this.lengthToWait[job] = 10 : this.lengthToWait[job] = lengthToWait;
        typeof timesToTry == 'undefined' ? this.timesToTry[job] = 0 : this.timesToTry[job] = timesToTry;
        this.timesTried[job] = 0;
        this.privateRun(job);
    },
    privateRun: function(job){
        //should not be called by a user, but must be public
        if(eval(this.boolTestCondition[job])){
            eval(this.codeToRun[job]);
            this.removeJob(job);
        }else{
            if(this.timesToTry[job] > 0){
               if(this.timesToTry[job] > this.timesTried[job]){
                   this.removeJob(job);
                   return;
               }else{
                   this.timesTried[job]++;
               }
           }
            setTimeout("runWhen.privateRun('"+job+"')", this.lengthToWait[job]);
        }
    },
    removeJob: function(job){
        //remove job
        delete this.boolTestCondition[job];
        delete this.codeToRun[job];
        delete this.lengthToWait[job];
        delete this.timesToTry[job];
        delete this.timesTried[job];
    },
    terminateJobs: function(){
        //remove all jobs
        for(var key in this.timesToTry){
            this.timesToTry[key] = 1;
        }
    }
}
