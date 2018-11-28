<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark container">
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{name: 'cars'}">Cars</router-link>
                </li>

                <li class="nav-item active">
                    <router-link class="nav-link" :to="{name: 'add'}">Add</router-link>
                </li>
                
            </ul>
        </div>
    </nav>

</template>


<script>
export default {
    
}
</script>

<style>

.navbar .collapse .navbar-nav .nav-item .nav-link {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e6f1ff;
}

.navbar .collapse .navbar-nav .nav-item .nav-link:hover {
    color: #007bff;
}
</style>
