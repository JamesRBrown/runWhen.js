//title:    runWhen
//license:  MIT
//auther:   James R. Brown
//version:  1.0

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
