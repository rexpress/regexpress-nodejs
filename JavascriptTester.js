var JavascriptTester = function() {
};

JavascriptTester.prototype = {
    testRegex : function(config, testStrings) {
        var result = {
            "resultList": []
        };

        try {
            var flags = "";
            if(config["global"])
                flags += "g";
            if(config["ignore"])
                flags += "i";
            if(config["multiline"])
                flags += "m";
            if(config["unicode"])
                flags += "u";
            if(config["sticky"])
                flags += "y";

            if(!config["test_type"])
                throw new Error("'test_type' parameter doesn't exists.");

            var regex = new RegExp(config["regex"], flags);

            switch(config["test_type"]) {
                case "match":
                    result["type"] = "MATCH";
                    testStrings.forEach(function(testString){
                        result["resultList"].push(regex.test(testString) ? true : false);
                    });
                    break;
                case "group":
                    result["type"] = "GROUP";
                    result["columns"] = [];

                    var groupCount = (new RegExp(regex.toString() + '|')).exec('').length;
                    for(var i = 0; i < groupCount; i++) {
                        result["columns"].push("Group #" + i);
                    }

                    testStrings.forEach(function(testString) {
                        var groupsList = {"list": []};
                        var lastIndex = -1;
                        while((match = regex.exec(testString)) != null) {
                            if(lastIndex == match.lastIndex) {
                                break;
                            }
                            lastIndex = match.lastIndex;
                            var groups = [];
                            match.forEach(function(group){
                                groups.push(group);
                            });
                            groupsList["list"].push(groups);
                        }
                        if(groupsList["list"].length > 0) {
                            result["resultList"].push(groupsList);
                        } else {
                            result["resultList"].push(null);
                        }
                    });
                    break;
                case "replace":
                    result["type"] = "STRING";
                    var replaceString = config["replace"];
                    testStrings.forEach(function(testString) {
                        result["resultList"].push(testString.replace(regex, replaceString));
                    });
                    break;
            }
        } catch(e) {
            result["exception"] = e.message;
        } finally {
            return result;
        }
    }
};

var main = function(){
    config = JSON.parse(process.argv[2]);
    testStrings = JSON.parse(process.argv[3]);

    var tester = new JavascriptTester();
    result = tester.testRegex(config, testStrings);
    console.log("##START_RESULT##");
    console.log(JSON.stringify(result));
    console.log("##END_RESULT##");
}

if (require.main === module) {
    main();
}

module.exports = JavascriptTester;