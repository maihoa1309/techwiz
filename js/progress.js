
const app = angular.module('myApp', [
    //list of modules                    
])   

app.controller('ProgressController', async ($scope) => { 
    $scope.progresses = [];    
    let response = await axios.get(urlGetProgress, {headers})    
    if(response.status == 200) {        
        // debugger
        
        // $scope.maths = response?.data?.maths    
        // const progress = response?.data    
        // const object = "english"
        // $scope.maths = progress[object]

        const studentId = 2
        const subjectId = 2

        let responseStudents = await axios.get(urlGetStudents, {headers})    
        let responseProgress = await axios.get(urlGetProgress, {headers})    
        // let responseSubjects = await axios.get(urlGetSubjects, {headers})    
        const isRequestSuccess = responseStudents.status == 200 
                            && responseProgress.status == 200
                            // && responseSubjects.status == 200  
        if(!isRequestSuccess) {
            return {}
        }
        
        let studentDetail = responseStudents?.data?.students?.filter(item => item.studentId == studentId)[0]
                            
        $scope.detailProgressess = responseProgress?.data?.progress
        .filter(item => item.studentId==studentId && item.subjectId==subjectId)
        console.log($scope.detailProgressess)
        $scope.$apply();   //reload 
  
    }  
})

