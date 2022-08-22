const app = angular.module('myApp', [
    //list of modules                    
])   
function doSomething() {
    console.log('Hello')
    //add more for testing
}
async function getResult(studentId) {
    try {
        //get detail student        
        let results = []
        let responseStudents = await axios.get(urlGetStudents, {headers})    
        let responseMarks = await axios.get(urlGetMarks, {headers})    
        let responseSubjects = await axios.get(urlGetSubjects, {headers})    
        const isRequestSuccess = responseStudents.status == 200 
                            && responseMarks.status == 200
                            && responseSubjects.status == 200  
        if(!isRequestSuccess) {
            return {}
        }

        let studentDetail = responseStudents?.data
                ?.students
                ?.filter(item => item.studentId == studentId)[0]
        let detailMarks = responseMarks?.data?.marks
                        .filter(item => item.studentId == studentId)
        
        
        for(let detailMark of detailMarks) {
            let detailSubject = responseSubjects?.data?.subjects
                        .filter(item => item.subjectId == detailMark.subjectId)[0]
            debugger    
            results.push(
                {
                    studentId: studentDetail.studentId,
                    studentName: studentDetail.studentName,            
                    mark1: detailMark.mark1,
                    mark2: detailMark.mark2,
                    mark3: detailMark.mark3,
                    average: (detailMark.mark1 + detailMark.mark2 + detailMark.mark3)/3,
                    subjectId: detailSubject.subjectId,
                    subjectName: detailSubject.subjectName,
                }
            )
        }    
        
        return results
    } catch(e) {
        debugger
    }
}
app.controller('MarksController', async ($scope) => {


    $scope.click = async function(){
        if(!$scope.name){
            alert("You must enter your name.")
            return
        }else{
            $scope.detailResults = [];
            studentId = 1
            debugger
            $scope.detailResults = await getResult(studentId)
            
            $scope.classes = []
            let responseClasses = await axios.get(urlGetClasses, {headers})
            let responseSubjects = await axios.get(urlGetSubjects, {headers}) 
            
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
        
        }
    }
  
    $scope.$apply();   //reload 

// chart
const ctx = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');
const ctx3 = document.getElementById('myChart3');
const data = {
    labels: [
        'Done',
        "Not Done"
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [70, 30],
        backgroundColor: [
            "#FF0000",
            "rgb(72,72,72)",
        ],
        hoverOffset: 2
    }]
}
const config = {
    type: 'doughnut',
    data: data,
};
const myChart1 = new Chart(
    ctx,
    config
);
const myChart2 = new Chart(
    ctx2,
    config
);
const myChart3 = new Chart(
    ctx3,
    config
);
})