document.addEventListener('DOMContentLoaded', function () {
    setNginxStatusCircle();
});

function setNginxStatusCircle() {
    const nginxStatusCircle = document.getElementById('nginx-status-circle');

    fetch('/api/status-nginx')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const containerStatus = data.status;
            console.log("Container status: " + containerStatus);
            nginxStatusCircle.className = 'status-circle status-' + containerStatus;
            return containerStatus;
        });
}

let restartProcessComplete = true;

function restartStatusInterval() {
    const nginxStatusCircle = document.getElementById('nginx-status-circle');
    nginxStatusCircle.className = 'status-circle status-loading';

    const intervalId = setInterval(() => {
        if (restartProcessComplete) {
            clearInterval(intervalId);
            setNginxStatusCircle();
        } else {
            if (nginxStatusCircle.className === 'status-circle status-loading') {
                nginxStatusCircle.className = 'status-circle status-black';
            } else {
                nginxStatusCircle.className = 'status-circle status-loading';
            }
        }
    }, 100);
}


function restartNginx() {
    restartProcessComplete = false;
    restartStatusInterval();

    const restartBtn = document.getElementById('nginx-restart-btn');
    restartBtn.disabled = true;

    const restartSpinner = document.getElementById('nginx-restart-btn-spinner');
    restartSpinner.className = 'custom-spinner custom-spinner-sm';


    fetch('/api/restart-nginx', {method: "POST"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .finally(() => {
            setNginxStatusCircle();
            restartProcessComplete = true;
            restartSpinner.className = '';
            restartBtn.disabled = false;
        });
}