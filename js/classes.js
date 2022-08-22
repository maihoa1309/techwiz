const app = angular.module('myApp', [
    //list of modules                    
]) 
app.controller('ClassesController', async ($scope) =>{
    $scope.classes = []
    let responseClasses = await axios.get(urlGetClasses, {headers})
    let responseSubjects = await axios.get(urlGetSubjects, {headers}) 
    debugger
    if ((responseClasses.status == 200) && (responseSubjects.status == 200)){
        let detailClasses = responseClasses?.data?.classes
        for(let detailClass of detailClasses){
            let detailSubject = responseSubjects?.data?.subjects
            .filter(item => item.subjectId == detailClass.subjectId)[0]
            $scope.classes.push({
                subjectName : detailSubject.subjectName,
                class: detailClass.class,
                time: detailClass.time 
            })
 
        }
        console.log($scope.classes)
    }
    $scope.$apply(); 


})